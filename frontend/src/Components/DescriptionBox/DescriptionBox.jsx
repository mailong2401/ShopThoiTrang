import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade"> Review (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Một website thương mại điện tử là một nền tảng trực tuyến cho phép mua
          bán các sản phẩm hoặc dịch vụ qua internet. Trang web này như một chợ
          ảo, nơi doanh nghiệp và người tiêu dùng có thể tương tác, trình bày
          sản phẩm của họ, và thực hiện các giao dịch một cách thuận tiện mà
          không cần gặp trực tiếp. Các trang web này ngày càng phổ biến vì dễ
          dàng truy cập, thuận tiện, và có khả năng mở rộng lớn.
        </p>
        <p>
          Các trang web thương mại điện tử thường hiển thị các sản phẩm hoặc
          dịch vụ. Chúng cung cấp mô tả chi tiết, hình ảnh, giá cả và bất kỳ
          biến thể nào có sẵn của sản phẩm (ví dụ: kích thước, màu sắc). Mỗi sản
          phẩm thường có thông tin riêng biệt liên quan đến nó.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
