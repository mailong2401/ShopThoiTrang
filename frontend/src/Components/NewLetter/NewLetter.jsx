import React from "react";
import "./NewLetter.css";
import { motion } from "framer-motion"; // ✅ Thêm motion

const NewLetter = () => {
  return (
    <motion.div
      className="new-letter"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Nhận ưu đãi độc quyền qua email của bạn
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Đăng ký nhận bản tin của chúng tôi và cập nhật thông tin
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <input type="email" placeholder="Nhập email của bạn" />
        <button>Đăng ký</button>
      </motion.div>
    </motion.div>
  );
};

export default NewLetter;
