import React, { useContext, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./CSS/CheckoutPage.css";
import L from "leaflet";
import remove_icon from "../Components/Assets/cart_cross_icon.png";
import { ShopContext } from "../Context/ShopContext";
import logo_vcb from "../Components/Assets/logo_VCB.jpg";
import logo_tcb from "../Components/Assets/logo_TCB.png";
import logo_vtb from "../Components/Assets/logo_VTB.png";
import { useNavigate } from "react-router-dom";

function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in kilometers
}

const CheckoutPage = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
  const navigate = useNavigate(); // Thêm hook này
  const { placeOrder } = useContext(ShopContext);

  const [distanceKm, setDistanceKm] = useState(null);

  const handlePlaceOrder = async () => {
    const fullName = document.getElementById("fullName").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const address = document.getElementById("addressInput").value.trim();
    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked',
    );

    // Kiểm tra thông tin
    if (!fullName || !phoneNumber || !address || !paymentMethod) {
      alert("⚠️ Bạn chưa nhập đủ thông tin bắt buộc!");
      return;
    }

    // Gọi API đặt hàng
    const result = await placeOrder();
    if (result.success) {
      alert("🎉 Chúc mừng bạn đã đặt hàng thành công!");
      navigate("/"); // Chuyển hướng về trang chủ
      // Bạn có thể điều hướng sang trang cảm ơn, hoặc reload
    } else {
      alert(`❌ Đặt hàng thất bại: ${result.message}`);
    }
  };

  useEffect(() => {
    const map = L.map("map").setView([10.8016363, 106.714465], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);
    L.marker([10.762622, 106.660172]).addTo(map);
  }, []);
  const handlePaymentChange = (event) => {
    const value = event.target.value;
    document
      .querySelectorAll(".payment-logos")
      .forEach((el) => el.classList.add("hidden"));
    if (value === "bank") {
      document.getElementById("bankLogos").classList.remove("hidden");
    } else if (value === "credit") {
      document.getElementById("creditForm").classList.remove("hidden");
    }
  };

  const handleAddressChange = async () => {
    const address = document.getElementById("addressInput").value;
    if (!address) return;

    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address,
        )}&key=038f1836bab345fba66caf2647952126`,
      );
      const data = await res.json();

      if (data.results.length > 0) {
        const userLat = data.results[0].geometry.lat;
        const userLon = data.results[0].geometry.lng;

        const shopLat = 10.8016363;
        const shopLon = 106.714465;

        const distance = getDistance(
          userLat,
          userLon,
          shopLat,
          shopLon,
        ).toFixed(2);

        setDistanceKm(distance);
      } else {
        alert("Không tìm thấy địa chỉ.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi OpenCage API:", error);
    }
  };

  // Calculate shipping fee based on distance
  const calculateShippingFee = () => {
    if (!distanceKm) return 0;

    if (distanceKm < 10) {
      return 0; // Free shipping
    } else if (distanceKm >= 10 && distanceKm <= 100) {
      return 25000; // 25,000đ
    } else {
      return 35000; // 35,000đ
    }
  };

  const shippingFee = calculateShippingFee();
  const totalAmount = getTotalCartAmount() + shippingFee;

  return (
    <div className="checkout-container">
      <h2 className="text-center">Thanh toán đơn hàng</h2>
      <div className="checkout-grid">
        <div className="left-section">
          <div className="form-section">
            <label htmlFor="fullName" className="form-label">
              Họ và tên
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Nguyễn Văn A"
              required
            />
          </div>
          <div className="form-section">
            <label htmlFor="phoneNumber" className="form-label">
              Số điện thoại
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="0123 456 789"
              required
            />
          </div>
          <div className="form-section">
            <label htmlFor="addressInput" className="form-label">
              Địa chỉ nhận hàng
            </label>

            <input
              type="text"
              id="addressInput"
              className="form-control"
              placeholder="Nhập địa chỉ..."
              onBlur={handleAddressChange}
            />

            <div id="map"></div>

            <span>Khoảng cách giao hàng: </span>
            <span>{distanceKm ? `${distanceKm} km` : "Chưa có"}</span>
          </div>
          <div className="form-section">
            <label className="form-label">Hình thức vận chuyển</label>
            <div className="payment-method">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shippingOption"
                  id="express"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="express">
                  Giao Hàng Nhanh
                </label>
              </div>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shippingOption"
                  id="grab"
                />
                <label className="form-check-label" htmlFor="grab">
                  Giao Hàng Tiết Kiệm
                </label>
              </div>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shippingOption"
                  id="standard"
                />
                <label className="form-check-label" htmlFor="standard">
                  J&T Express
                </label>
              </div>
            </div>
          </div>
          <div className="form-section">
            <label htmlFor="note" className="form-label">
              Lời nhắn cho cửa hàng
            </label>
            <input type="text" className="form-control" id="note" />
          </div>
        </div>

        <div className="right-section">
          <div className="form-section">
            <h4 className="mb-3">Sản phẩm</h4>
            {all_product.map((e) => {
              if (cartItems[e.id] > 0) {
                return (
                  <div key={e.id} className="mb-3">
                    <div className="row align-items-center">
                      <div className="col-4 col-md-2">
                        <img
                          src={e.image}
                          alt={e.name}
                          className="img-fluid rounded"
                          style={{ maxHeight: "80px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-8 col-md-10">
                        <h5 className="mb-1">{e.name}</h5>
                        <p className="text-muted mb-1">
                          Giá từng món: {e.new_price.toLocaleString()}đ
                        </p>
                        <p className="mb-1">
                          Số lượng: <strong>{cartItems[e.id]}</strong>
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-danger fw-bold">
                            Tổng: $
                            {(e.new_price * cartItems[e.id]).toLocaleString()}đ
                          </span>
                          <img
                            className="cartitems-remove-icon"
                            src={remove_icon}
                            onClick={() => removeFromCart(e.id)}
                            alt="Xoá"
                            style={{ height: "20px", cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="form-section">
            <label className="form-label">Phương thức thanh toán</label>
            <div className="payment-method" onChange={handlePaymentChange}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="bank"
                  value="bank"
                />
                <label className="form-check-label" htmlFor="bank">
                  Chuyển khoản ngân hàng
                </label>
                <div id="bankLogos" className="payment-logos hidden mt-2">
                  <a href="#" target="_blank">
                    <img src={logo_vcb} alt="VCB" className="bank-logo" />
                  </a>
                  <a href="#" target="_blank">
                    <img src={logo_tcb} alt="TCB" className="bank-logo" />
                  </a>
                  <a href="#" target="_blank">
                    <img src={logo_vtb} alt="VTB" className="bank-logo" />
                  </a>
                </div>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="cod"
                  value="cod"
                />
                <label className="form-check-label" htmlFor="cod">
                  Thanh toán khi nhận hàng
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="credit"
                  value="credit"
                />
                <label className="form-check-label" htmlFor="credit">
                  Thẻ tín dụng
                </label>
                <div id="creditForm" className="payment-logos hidden mt-2">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Số thẻ"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Tên chủ thẻ"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ngày hết hạn (MM/YY)"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Mã CVV"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-label">
              <h5>Chi tiết thanh toán</h5>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between">
                  <span>Tạm tính</span>
                  <span>{getTotalCartAmount().toLocaleString()}đ</span>
                </li>
                <li className="d-flex justify-content-between">
                  <span>Phí vận chuyển</span>
                  <span>
                    {shippingFee === 0
                      ? "Miễn phí"
                      : `${shippingFee.toLocaleString()}đ`}
                    {distanceKm && ` (${distanceKm} km)`}
                  </span>
                </li>

                <li className="d-flex justify-content-between text-danger fw-bold">
                  <span>Tổng tiền</span>
                  <span>{totalAmount.toLocaleString()}đ</span>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => {
                handlePlaceOrder();
              }}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
