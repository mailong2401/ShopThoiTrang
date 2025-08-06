import React from "react";
import "./Offers.css";
import exclucive_image from "../Assets/exclusive_image.png";
import { motion } from "framer-motion"; // ✅ import motion

const Offers = () => {
  return (
    <motion.div
      className="offers"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="offers-left"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h1>Độc quyền</h1>
        <h1>Ưu đãi dành cho bạn</h1>
        <p>CHỈ CÓ TRÊN CÁC SẢN PHẨM BÁN CHẠY NHẤT</p>
        <button>Kiểm tra ngay</button>
      </motion.div>

      <motion.div
        className="offers-right"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <motion.img
          src={exclucive_image}
          alt=""
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Offers;
