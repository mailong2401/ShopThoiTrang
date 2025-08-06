import React, { useEffect, useState } from "react";
import "./Popular.css";
import { Item } from "../Item/Item";
import { motion } from "framer-motion"; // ✅ import motion

export const Popular = () => {
  const [popularinwomen, setPopularInWomen] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((response) => response.json())
      .then((data) => setPopularInWomen(data))
      .catch((error) => console.error("Lỗi khi gọi API:", error));
  }, []);

  return (
    <motion.div
      className="popular"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        PHỔ BIẾN Ở PHỤ NỮ
      </motion.h1>
      <hr />

      <div className="popular-item">
        {popularinwomen.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Item
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
