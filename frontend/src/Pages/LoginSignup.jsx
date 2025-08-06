import React, { useRef, useEffect, useState } from "react";
import "./CSS/LoginSignup.css";
import * as THREE from "three";
import NET from "vanta/src/vanta.net";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export const LoginSignup = () => {
  const [state, setState] = useState("Đăng nhập");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const responseGoogle = async (response) => {
    try {
      const res = await fetch("http://localhost:4000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: response.credential,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Đăng nhập bằng Google thất bại");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi đăng nhập");
    }
  };

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
        backgroundColor: 0x000000c,
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
            placeholder="Địa chỉ email"
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
          {state}
        </button>

        {/* Thêm phần đăng nhập bằng Google ở đây */}
        <div className="google-login-container">
          <p className="or-divider">Hoặc đăng nhập bằng</p>
          <GoogleOAuthProvider clientId="244449280138-bsrd3pjtgul7if36r7i8ttnmarcqsnaf.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
              theme="filled_blue"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="300"
            />
          </GoogleOAuthProvider>
        </div>

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

        
      </div>
    </div>
  );
};
