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
        window.location.reload();
      } else {
        alert(`Lỗi: ${result.message}`);
      }
    }
  };

  const handleRefund = async (orderId) => {
    const confirmation = window.confirm(
      "Bạn có chắc chắn muốn hoàn trả đơn hàng này?",
    );
    if (!confirmation) return;

    try {
      const response = await fetch(
        `http://localhost:4000/orders/${orderId}/refund`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token") || "",
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.success) {
        alert("✅ Yêu cầu hoàn trả đã được ghi nhận!");
        window.location.reload();
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("Lỗi gửi yêu cầu hoàn hàng:", error);
      alert("❌ Có lỗi xảy ra khi gửi yêu cầu hoàn trả.");
    }
  };

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

                  <p>
                    {order.status === "return_requested"
                      ? "Đang hoàn hàng"
                      : order.isDelivered
                        ? "Đã nhận hàng"
                        : "Đang giao"}
                  </p>

                  {order.isDelivered ? (
                    (() => {
                      const deliveryDate = new Date(order.deliveryDate);
                      const now = new Date();
                      const diffDays = Math.floor(
                        (now - deliveryDate) / (1000 * 60 * 60 * 24),
                      );
                      const isRefundable = diffDays <= 10;

                      if (order.status === "return_requested") {
                        return (
                          <button
                            className="Button-Return"
                            disabled
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              cursor: "pointer",
                              opacity: 1,
                            }}
                          >
                            Đã yêu cầu
                          </button>
                        );
                      }

                      const handleRefundClick = async () => {
                        if (!isRefundable) {
                          const confirmLate = window.confirm(
                            "⚠️ Đơn hàng đã quá hạn 10 ngày. Bạn vẫn muốn yêu cầu hoàn trả?",
                          );
                          if (!confirmLate) return;
                        }
                        await handleRefund(order._id);
                      };

                      return (
                        <button
                          className="Button-Return"
                          onClick={handleRefundClick}
                          style={{
                            opacity: isRefundable ? 1 : 0.5,
                            cursor: "pointer",
                          }}
                        >
                          Hoàn Trả
                        </button>
                      );
                    })()
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
