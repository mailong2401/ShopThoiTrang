import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import { Item } from "../Item/Item";

const RelatedProducts = () => {
  const [popularinwomen, setPopularInWomen] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((response) => response.json()) // ✅ return kết quả
      .then((data) => setPopularInWomen(data))
      .catch((error) => console.error("Lỗi khi gọi API:", error));
  }, []); // ✅ thêm [] để chỉ gọi 1 lần khi component mount

  return (
    <div className="relatedproducts">
      <h1>Sản phẩm liên quan</h1>
      <hr />
      <div className="relatedproducts-item">
        {popularinwomen.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            ></Item>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
