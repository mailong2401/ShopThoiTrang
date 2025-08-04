import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  const cart = {};
  for (let i = 0; i <= 300; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState({
    products: true,
    cart: true,
    orders: true,
    user: true,
  });
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const fetchData = async (url, options = {}) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`Fetch error (${url}):`, err);
      setError(err.message);
      throw err;
    }
  };

  const fetchUserData = async () => {
    setLoading((prev) => ({ ...prev, user: true }));
    try {
      const data = await fetchData("http://localhost:4000/getuser", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token") || "",
          "Content-Type": "application/json",
        },
      });
      if (data.success) setUser(data.user);
    } catch (_) {
      // silent
    } finally {
      setLoading((prev) => ({ ...prev, user: false }));
    }
  };

  const fetchUserOrders = async () => {
    setLoading((prev) => ({ ...prev, orders: true }));
    try {
      const data = await fetchData("http://localhost:4000/myorders", {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token") || "",
          "Content-Type": "application/json",
        },
      });
      if (data.success) setOrders(data.orders);
    } catch (_) {
      // silent
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }));
    }
  };

  const fetchInitialData = async () => {
    try {
      const products = await fetchData("http://localhost:4000/allproducts");
      setAll_Product(products);
      setLoading((prev) => ({ ...prev, products: false }));

      const token = localStorage.getItem("auth-token");
      if (token) {
        const cartData = await fetchData("http://localhost:4000/getcart", {
          method: "POST",
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        setCartItems(cartData);
        setLoading((prev) => ({ ...prev, cart: false }));

        await Promise.all([fetchUserData(), fetchUserOrders()]);
      } else {
        setLoading((prev) => ({
          ...prev,
          cart: false,
          user: false,
          orders: false,
        }));
      }
    } catch (err) {
      console.error("Initial fetch failed:", err);
      setLoading({
        products: false,
        cart: false,
        orders: false,
        user: false,
      });
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const placeOrder = async () => {
    setLoading((prev) => ({ ...prev, orders: true }));
    try {
      const data = await fetchData("http://localhost:4000/placeorder", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token") || "",
          "Content-Type": "application/json",
        },
      });
      if (data.success) {
        setCartItems(getDefaultCart());
        await fetchUserOrders();
        return { success: true, orderId: data.orderId };
      }
      throw new Error(data.message || "Order placement failed");
    } catch (err) {
      console.error("Order error:", err);
      return { success: false, message: err.message };
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }));
    }
  };

  const confirmDelivery = async (orderId) => {
    setLoading((prev) => ({ ...prev, orders: true }));
    try {
      const data = await fetchData("http://localhost:4000/confirmdelivery", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token") || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      if (data.success) {
        await fetchUserOrders();
        return { success: true };
      }
      throw new Error(data.message || "Delivery confirmation failed");
    } catch (err) {
      console.error("Delivery confirm error:", err);
      return { success: false, message: err.message };
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }));
    }
  };

  const updateCartOnServer = async (itemId, quantityChange) => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    const endpoint = quantityChange > 0 ? "addtocart" : "removefromcart";

    try {
      // Gửi yêu cầu thêm/xóa đến server
      await fetch(`http://localhost:4000/${endpoint}`, {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      // Sau khi thành công, LẤY LẠI giỏ hàng mới nhất từ server
      const updatedCart = await fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      // Cập nhật state với dữ liệu mới nhất
      setCartItems(updatedCart);
    } catch (err) {
      console.error("Lỗi đồng bộ giỏ hàng:", err);
      // Nếu lỗi, khôi phục lại state trước đó
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - quantityChange,
      }));
    }
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: prev[itemId] + 1 };
      updateCartOnServer(itemId, 1); // đồng bộ lên server
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 0) {
        const updated = { ...prev, [itemId]: prev[itemId] - 1 };
        updateCartOnServer(itemId, -1);
        return updated;
      }
      return prev;
    });
  };

  const getTotalCartItems = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const getTotalCartAmount = () =>
    Object.entries(cartItems).reduce((sum, [id, qty]) => {
      const item = all_product.find((p) => p.id === Number(id));
      return sum + (item?.new_price || 0) * qty;
    }, 0);

  const clearError = () => setError(null);

  const contextValue = {
    all_product,
    cartItems,
    orders,
    loading,
    error,
    user,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
    placeOrder,
    confirmDelivery,
    fetchUserOrders,
    clearError,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
