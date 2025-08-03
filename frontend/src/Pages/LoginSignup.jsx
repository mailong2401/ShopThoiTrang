import React, { useRef, useEffect, useState } from "react";
import "./CSS/LoginSignup.css";
import * as THREE from "three";
import NET from "vanta/src/vanta.net"; // ✅ Import đúng

export const LoginSignup = () => {
  const [state, setState] = useState("Đăng nhập");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const Login = async () => {
    console.log("Login Func", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const Signup = async () => {
    console.log("Signup Func", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Đăng ký" ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Tên của bạn"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Địa chỉa email"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Mật Khẩu"
          />
        </div>
        <button
          onClick={() => {
            state === "Đăng nhập" ? Login() : Signup();
          }}
        >
          Continue
        </button>
        {state === "Đăng ký" ? (
          <p className="loginsignup-login">
            Bạn đã có tài khoản?{" "}
            <span
              onClick={() => {
                setState("Đăng nhập");
              }}
            >
              Đăng nhập
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Tạo một tài khoản?{" "}
            <span
              onClick={() => {
                setState("Đăng ký");
              }}
            >
              NHẤN VÀO ĐÂY
            </span>
          </p>
        )}

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
