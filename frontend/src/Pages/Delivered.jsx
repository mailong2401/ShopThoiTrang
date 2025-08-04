import React, { useContext } from "react";
import "./CSS/Delivered.css";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const Delivered = () => {
  const { orders, confirmDelivery } = useContext(ShopContext);

  const handleReturn = async (orderId) => {
    const confirmation = window.confirm("Bạn có chắc đã nhận đơn hàng này?");
    if (confirmation) {
      const result = await confirmDelivery(orderId);
      if (result.success) {
        alert("Chúc mừng bạn đã nhận được hàng thành công!");
        // Cập nhật lại danh sách đơn hàng để hiển thị ngày nhận hàng
        window.location.reload(); // Hoặc sử dụng state update nếu bạn đã xử lý
      } else {
        alert(`Lỗi: ${result.message}`);
      }
    }
  };

  const handleRefund = async () => {
    const confirmation = window.confirm(
      "Bạn có chắc chắn muốn hoàn trả đơn hàng này?",
    );
    if (confirmation) {
      alert("Yêu cầu hoàn trả đã được ghi nhận!");
    }
  };

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa nhận hàng";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN")
    );
  };

  return (
    <div className="cartitems">
      <h1>Đơn Hàng Đã Nhận</h1>
      <div className="cartitems-format-main">
        <p>Sản Phẩm</p>
        <p>Tên</p>
        <p>Giá</p>
        <p>Số Lượng</p>
        <p>Tổng</p>
        <p>Ngày Đặt</p>
        <p>Ngày Nhận</p>
        <p>Trạng Thái</p>
        <p>Thao Tác</p>
      </div>
      <hr />

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>Bạn chưa có đơn hàng nào</p>
          <Link to="/" className="continue-shopping">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-container">
            {Object.entries(order.itemsWithDetails || {}).map(
              ([productId, item]) => (
                <div key={productId} className="cartitems-format">
                  <img
                    className="carticon-product-icon"
                    src={item.details.image}
                    alt={item.details.name}
                  />
                  <p>{item.details.name}</p>
                  <p>{item.details.price.toLocaleString()}đ</p>
                  <div className="cartitems-quantity">{item.quantity}</div>
                  <p>
                    {(item.details.price * item.quantity).toLocaleString()}đ
                  </p>
                  <p>{order.formattedDate}</p>
                  <p>{formatDate(order.deliveryDate)}</p>
                  <p>{order.isDelivered ? "Đã nhận hàng" : "Đang giao"}</p>
                  {order.isDelivered ? (
                    <button className="Button-Return" onClick={handleRefund}>
                      Hoàn Trả
                    </button>
                  ) : (
                    <button
                      className="Button-Confirm"
                      onClick={() => handleReturn(order._id)}
                    >
                      Xác Nhận Đã Nhận
                    </button>
                  )}
                </div>
              ),
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Delivered;
