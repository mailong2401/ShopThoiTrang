import React, { useRef, useEffect } from "react";
import "./CSS/LoginSignup.css";
import * as THREE from "three";
import NET from "vanta/src/vanta.net"; // ✅ Import đúng

export const LoginSignup = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        maxDistance: 15.0,
        color: 0xff677c,
        backgroundColor: 0x25253c,
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} className="loginsignup" style={{ minHeight: "100vh" }}>
      <div className="loginsignup-container">
        <h1>ĐĂNG KÝ</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Tên của bạn" />
          <input type="email" placeholder="Địa chỉa email" />
          <input type="password" placeholder="Mật Khẩu" />
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">
          Bạn đã có tài khoản? <span>Đăng nhập</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" />
          <p>
            Bằng cách tiếp tục, tôi đồng ý với các điều khoản sử dụng và chính
            sách bảo mật.
          </p>
        </div>
      </div>
    </div>
  );
};
