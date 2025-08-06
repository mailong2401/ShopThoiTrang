import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import delivered_icon from "../Assets/delivered.png";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, user } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  // Animation variants
  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 }
  };

  return (
    <motion.div 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="nav-logo"
        whileHover={{ scale: 1.05 }}
      >
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </motion.div>

      <motion.img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
        whileTap={{ rotate: 180 }}
        transition={{ duration: 0.3 }}
      />

      <AnimatePresence>
        <motion.ul 
          ref={menuRef} 
          className="nav-menu"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {["shop", "mens", "womens", "kids"].map((item) => (
            <motion.li
              key={item}
              onClick={() => setMenu(item)}
              variants={menuItemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Link 
                className="nav-link" 
                style={{ textDecoration: "none" }} 
                to={`/${item === "shop" ? "" : item}`}
              >
                {item === "shop" ? "Cửa hàng" : 
                 item === "mens" ? "Nam" : 
                 item === "womens" ? "Nữ" : "Trẻ em"}
              </Link>
              {menu === item && (
                <motion.hr
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <motion.div 
            className="user-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span whileHover={{ color: "#ff4141" }}>
              Xin chào, {user?.name || "Khách"}
            </motion.span>
            <motion.button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}
              whileHover={{ scale: 1.05, backgroundColor: "#ff4141" }}
              whileTap={{ scale: 0.95 }}
            >
              Đăng xuất
            </motion.button>
          </motion.div>
        ) : (
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ff4141" }}
              whileTap={{ scale: 0.95 }}
            >
              Đăng nhập
            </motion.button>
          </Link>
        )}

        <Link to="/delivered">
          <motion.img 
            src={delivered_icon} 
            alt="" 
            className="icon_nav"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          />
        </Link>

        <Link to="/cart">
          <motion.div 
            className="cart-icon-container"
            whileHover={{ scale: 1.1 }}
          >
            <img src={cart_icon} alt="" className="icon_nav" />
            <motion.div 
              className="nav-cart-count"
              key={getTotalCartItems()}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {getTotalCartItems()}
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Navbar;