import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { motion } from "framer-motion";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  return (
    <motion.div
      className="productdisplay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* LEFT SIDE */}
      <motion.div
        className="productdisplay-left"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="productdisplay-img-list">
          {[1, 2, 3, 4].map((_, i) => (
            <motion.img
              key={i}
              src={product.image}
              alt=""
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>
        <div className="productdisplay-img">
          <motion.img
            className="productdisplay-main-img"
            src={product.image}
            alt=""
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        className="productdisplay-right"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          {[1, 2, 3, 4].map((_, i) => (
            <img key={i} src={star_icon} alt="star" />
          ))}
          <img src={star_dull_icon} alt="star" />
          <p>(123)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            {product.old_price.toLocaleString()}đ
          </div>
          <div className="productdisplay-right-price-new">
            {product.new_price.toLocaleString()}đ
          </div>
        </div>
        <div className="productdisplay-right-description">
          Là một chiếc áo sơ mi nhẹ, thường được đan móc (knitted)...
        </div>
        <div className="productdisplay-right-size">
          <h1>Chọn kích thước</h1>
          <div className="productdisplay-right-sizes">
            {["S", "M", "XL", "XXL"].map((size, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {size}
              </motion.div>
            ))}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => addToCart(product.id)}
        >
          ADD TO CART
        </motion.button>
        <p className="productdisplay-right-category">
          <span>Loại :</span> Phụ nữ, Áo phông, Áo crop top
        </p>
        <p className="productdisplay-right-category">
          <span>Thẻ :</span> Morden, Mới nhất
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProductDisplay;
