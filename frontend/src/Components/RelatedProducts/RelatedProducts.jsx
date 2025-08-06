import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import { Item } from "../Item/Item";
import { motion } from "framer-motion";

const RelatedProducts = () => {
  const [popularinwomen, setPopularInWomen] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((response) => response.json())
      .then((data) => setPopularInWomen(data))
      .catch((error) => console.error("Lỗi khi gọi API:", error));
  }, []);

  return (
    <motion.div
      className="relatedproducts"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Sản phẩm liên quan
      </motion.h1>
      <motion.hr
        initial={{ width: 0 }}
        whileInView={{ width: "10%" }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="relatedproducts-item"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {popularinwomen.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
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
      </motion.div>
    </motion.div>
  );
};

export default RelatedProducts;
