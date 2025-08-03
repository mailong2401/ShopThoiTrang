import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import { Item } from "../Item/Item";

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollection")
      .then((response) => response.json())
      .then((data) => setNew_collection(data))
      .catch((err) => console.error("Lỗi fetch newcollection:", err));
  }, []);

  return (
    <div className="new-collections">
      <h1>BỘ SƯU TẬP MỚI</h1>
      <hr />
      <div className="collections">
        {Array.isArray(new_collection) &&
          new_collection.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
      </div>
    </div>
  );
};

export default NewCollections;
