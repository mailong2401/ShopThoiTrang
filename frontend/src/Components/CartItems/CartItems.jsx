import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./CartItems.css";
import remove_icon from "../Assets/cart_cross_icon.png";
import { Link } from "react-router-dom";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Sản phẩm</p>
        <p>Tên</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Tổng</p>
        <p>Xóa</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img className="carticon-product-icon" src={e.image} alt="" />
                <p>{e.name}</p>
                <p>{e.new_price.toLocaleString()}đ</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>{(e.new_price * cartItems[e.id]).toLocaleString()}đ</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Tạm tính</p>
              <p>{getTotalCartAmount().toLocaleString()}đ</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Phí vận chuyển</p>
              <p>Chưa có</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Tổng</h3>
              <h3>{getTotalCartAmount().toLocaleString()}đ</h3>
            </div>
          </div>
          <Link to="/checkout">
            <button className="btn btn-primary">Thanh toán</button>
          </Link>
        </div>
        <div className="cartitems-promocode">
          <p>Nếu bạn có mã khuyến mại, hãy nhập vào đây</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="mã khuyến mãi" />
            <button>Áp dụng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
