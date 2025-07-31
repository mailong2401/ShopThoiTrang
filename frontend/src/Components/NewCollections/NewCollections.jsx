import React from "react";
import "./NewCollections.css";
import new_collection from "../Assets/new_collections.js";
import { Item } from "../Item/Item";

const NewCollections = () => {
  return (
    <div className="new-collections">
      <h1>BỘ SƯU TẬP MỚI</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
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

export default NewCollections;
