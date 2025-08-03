import React, { useEffect, useState } from "react";
import "./Popular.css";
import { Item } from "../Item/Item";

export const Popular = () => {
  const [popularinwomen, setPopularInWomen] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((response) => response.json()) // ✅ return kết quả
      .then((data) => setPopularInWomen(data))
      .catch((error) => console.error("Lỗi khi gọi API:", error));
  }, []); // ✅ thêm [] để chỉ gọi 1 lần khi component mount

  return (
    <div className="popular">
      <h1>PHỔ BIẾN Ở PHỤ NỮ</h1>
      <hr />
      <div className="popular-item">
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
