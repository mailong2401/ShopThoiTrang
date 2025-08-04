import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(123)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            {product.old_price.toLocaleString()}đ
          </div>
          <div className="productdisplay-right-price-new">
            {product.new_price.toLocaleString()}đ
          </div>
        </div>
        <div className="productdisplay-right-description">
          Là một chiếc áo sơ mi nhẹ, thường được đan móc (knitted). Có kiểu dáng
          kiểu pullover (khoác qua đầu). Chống vừa vặn, ôm sát. Có cổ tròn và
          tay ngắn. Được mặc như một áo lót dưới hoặc ngoài áo khác.
        </div>
        <div className="productdisplay-right-size">
          <h1>Chọn kích thước</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Loại :</span>
          Phụ nữ, Áo phông, Áo crop top
        </p>
        <p className="productdisplay-right-category">
          <span>Thẻ :</span>
          Morden, Mới nhất
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
