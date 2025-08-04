import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState({
    products: true,
    cart: true,
    orders: true,
  });
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch(
          "http://localhost:4000/allproducts",
        );
        const productsData = await productsResponse.json();
        setAll_Product(productsData);
        setLoading((prev) => ({ ...prev, products: false }));

        // Fetch cart and orders if authenticated
        if (localStorage.getItem("auth-token")) {
          const cartResponse = await fetch("http://localhost:4000/getcart", {
            method: "POST",
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });
          const cartData = await cartResponse.json();
          setCartItems(cartData);
          setLoading((prev) => ({ ...prev, cart: false }));

          await fetchUserOrders();
        }
      } catch (err) {
        setError(err.message);
        setLoading({ products: false, cart: false, orders: false });
      }
    };

    fetchInitialData();
  }, []);

  // Fetch user orders
  const fetchUserOrders = async () => {
    try {
      setLoading((prev) => ({ ...prev, orders: true }));
      const response = await fetch("http://localhost:4000/myorders", {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
      setLoading((prev) => ({ ...prev, orders: false }));
    } catch (err) {
      setError(err.message);
      setLoading((prev) => ({ ...prev, orders: false }));
    }
  };

  // Place order function
  const placeOrder = async () => {
    try {
      setLoading((prev) => ({ ...prev, orders: true }));
      const response = await fetch("http://localhost:4000/placeorder", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();

      if (data.success) {
        setCartItems(getDefaultCart());
        await fetchUserOrders();
        return { success: true, orderId: data.orderId };
      }
      throw new Error(data.message || "Order placement failed");
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }));
    }
  };

  // Confirm delivery function
  const confirmDelivery = async (orderId) => {
    try {
      setLoading((prev) => ({ ...prev, orders: true }));
      const response = await fetch("http://localhost:4000/confirmdelivery", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm delivery");
      }

      const data = await response.json();

      if (data.success) {
        await fetchUserOrders();
        return { success: true };
      }
      throw new Error(data.message || "Delivery confirmation failed");
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }));
    }
  };

  // Cart functions
  const updateCartOnServer = async (itemId, quantityChange) => {
    if (!localStorage.getItem("auth-token")) return;

    try {
      const endpoint = quantityChange > 0 ? "addtocart" : "removefromcart";
      await fetch(`http://localhost:4000/${endpoint}`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
    } catch (err) {
      // Rollback local changes if server update fails
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - quantityChange,
      }));
      setError("Failed to sync cart with server");
    }
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: prev[itemId] + 1 };
      updateCartOnServer(itemId, 1);
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 0) {
        const newCart = { ...prev, [itemId]: prev[itemId] - 1 };
        updateCartOnServer(itemId, -1);
        return newCart;
      }
      return prev;
    });
  };

  // Calculation functions
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce(
      (sum, quantity) => sum + quantity,
      0,
    );
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((sum, [itemId, quantity]) => {
      if (quantity > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(itemId),
        );
        return sum + (itemInfo?.new_price || 0) * quantity;
      }
      return sum;
    }, 0);
  };

  const clearError = () => setError(null);

  const contextValue = {
    all_product,
    cartItems,
    orders,
    loading,
    error,
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
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
