import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import { motion } from "framer-motion";
import "../../Pages/CSS/WetEffect.css"

export const Hero = () => {
  return (
    <div className="hero1">
      <motion.div
        style={{
          padding: '20px',
          background: 'rgba(0, 0, 255, 0.1)',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}
        whileHover={{
          background: 'rgba(0, 0, 255, 0.2)'
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%)',
            transform: 'rotate(30deg)'
          }}
          animate={{
            x: ['-30%', '30%'],
            y: ['-30%', '30%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />

        <div className="hero" style={{ position: 'relative', zIndex: 1 }}>
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
  onClick={() => window.scrollTo({ top: 2050, behavior: 'smooth' })}
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
            whileHover={{ scale: 1.1, rotate: 2 }}
          >
            <img src={hero_image} alt="" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
