import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import delivered_icon from "../Assets/delivered.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, user } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link className="nav-link" style={{ textDecoration: "none" }} to="/">
            Cửa hàng
          </Link>
          {menu === "shop" ? <hr></hr> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link
            className="nav-link"
            style={{ textDecoration: "none" }}
            to="/mens"
          >
            Nam
          </Link>
          {menu === "mens" ? <hr></hr> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link
            className="nav-link"
            style={{ textDecoration: "none" }}
            to="/womens"
          >
            Nữ
          </Link>
          {menu === "womens" ? <hr></hr> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link
            className="nav-link"
            style={{ textDecoration: "none" }}
            to="/kids"
          >
            Trẻ em
          </Link>
          {menu === "kids" ? <hr></hr> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <div className="user-greeting">
            <span>Xin chào, {user?.name || "Khách"}</span>
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button>Đăng nhập</button>
          </Link>
        )}
        <Link to="/delivered">
          <img src={delivered_icon} alt="" className="icon_nav" />
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="" className="icon_nav" />
        </Link>

        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
