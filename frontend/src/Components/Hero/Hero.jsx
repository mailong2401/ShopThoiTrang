import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_imae from "../Assets/hero_image.png";

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>CHỈ NHẬN KHÁCH ĐẾN MỚI</h2>
        <div>
          <div className="hero-hand-icon">
            <p>mới</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>bộ sưu tầm</p>
          <p>dành cho mọi người</p>
        </div>
        <div className="hero-latest-btn">
          <div>Bộ sưu tập mới nhất</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_imae} alt="" />
      </div>
    </div>
  );
};
