import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import { Item } from "../Item/Item";
import { motion } from "framer-motion"; // ✅ Thêm framer-motion

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollection")
      .then((response) => response.json())
      .then((data) => setNew_collection(data))
      .catch((err) => console.error("Lỗi fetch newcollection:", err));
  }, []);

  return (
    <motion.div
      className="new-collections"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        BỘ SƯU TẬP MỚI
      </motion.h1>
      <motion.hr
        initial={{ width: 0 }}
        whileInView={{ width: "10%" }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />

      <div className="collections">
        {Array.isArray(new_collection) &&
          new_collection.map((item, i) => (
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

export default NewCollections;
