import React from "react";
import "./NewLetter.css";

const NewLetter = () => {
  return (
    <div className="new-letter">
      <h1>Nhận ưu đãi độc quyền qua email của bạn</h1>
      <p>Đăng ký nhận bản tin của chúng tôi và cập nhật thông tin</p>
      <div>
        <input type="email" name="" value="" placeholder="Nhập email của bạn" />
        <button>Đăng ký</button>
      </div>
    </div>
  );
};

export default NewLetter;
