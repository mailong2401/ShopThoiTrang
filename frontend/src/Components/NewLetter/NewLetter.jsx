import React, { useEffect, useState } from "react";
import "./NewLetter.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // ms
    const stepTime = Math.max(Math.floor(duration / target), 10);

    const interval = setInterval(() => {
      start += Math.ceil(target / (duration / stepTime));
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        display: "inline-block",
        fontSize: "20px",
        color: "#000000ff",
        marginBottom: "10px",
        fontWeight: "bold",
      }}
    >
      {count.toLocaleString()} người đã đăng ký 🎉
    </motion.span>
  );
};



const NewLetter = () => {
  return (
    <motion.div
      className="new-letter"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Nhận ưu đãi độc quyền qua email của bạn
        
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Đăng ký nhận bản tin của chúng tôi và cập nhật thông tin
      </motion.p>
      <AnimatedCounter target={99881224} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <input type="email" placeholder="Nhập email của bạn" />
        <button>Đăng ký</button>
      </motion.div>
    </motion.div>
  );
};

export default NewLetter;
