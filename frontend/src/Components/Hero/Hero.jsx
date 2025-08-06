
import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_imae from "../Assets/hero_image.png";
import { motion } from "framer-motion";
import "../../Pages/CSS/WetEffect.css"

export const Hero = () => {
  return (
    <div className="hero">
      {/* Hero Left */}
      <motion.div
        className="hero-left"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
<motion.h2
  animate={{ color: ["#ff0000", "#00ff00", "#0000ff", "#ff00ff"] }}
  transition={{ repeat: Infinity, duration: 2 }}
>
  CHỈ NHẬN KHÁCH ĐẾN MỚI
</motion.h2>
        <div>
          <div className="hero-hand-icon">
            <p>mới</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>bộ sưu tầm</p>
          <p>dành cho mọi người</p>
        </div>

        <motion.div
          className="hero-latest-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div>Bộ sưu tập mới nhất</div>
          <img src={arrow_icon} alt="" />
        </motion.div>
      </motion.div>

      {/* Hero Right */}
      
<motion.div
  className="hero-right"
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  whileHover={{ scale: 1.05, rotate: 2 }}
>
  <motion.img
    src={hero_imae}
    alt=""
    whileHover={{
      scale: 1.1,
      rotate: 2,
      transition: { duration: 0.4 },
    }}
  />
</motion.div>

    </div>
  );
};

