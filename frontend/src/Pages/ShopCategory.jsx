import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";
import prodown_icon from "../Components/Assets/dropdown_icon.png";
import { Item } from "../Components/Item/Item";
import { motion } from "framer-motion"; // ✅ Thêm motion

export const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <motion.div
      className="shop-category"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Banner */}
      <motion.img
        className="shopcategory-banner"
        src={props.banner}
        alt=""
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      />

      {/* Index + Sort */}
      <motion.div
        className="shopcatelory-indexSort"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p>
          <span>Hiển thị 1-12</span> trong tổng số 36 sản phẩm
        </p>
        <div className="shopcategory-sort">
          Sắp xếp theo <img src={prodown_icon} alt="" />
        </div>
      </motion.div>

      {/* Products */}
      <div className="shopcategory-products">
        {all_product.map((item, i) =>
          props.category === item.category ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
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
          ) : null
        )}
      </div>

      {/* Load More Button */}
      <motion.div
        className="shopcategory-loadmore"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Explore More
      </motion.div>
    </motion.div>
  );
};
