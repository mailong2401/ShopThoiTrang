import { useEffect, useState } from "react";
import cross_icon from "../../assets/cross_icon.png";
import "./ListProduct.css";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/allproducts");
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchData();
  }, []);

  const remove_product = async (id) => {
    try {
      const res = await fetch("http://localhost:4000/removeproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (res.ok) {
        setAllProducts((prev) => prev.filter((product) => product.id !== id));
        console.log("Xóa sản phẩm thành công");
      } else {
        console.error("Lỗi khi xóa sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi mạng khi xóa sản phẩm:", error);
    }
  };

  return (
    <div className="list-product">
      <h1>Danh sách sản phẩm</h1>

      <div className="listproduct-format-main listproduct-format-header">
        <p>Hình ảnh</p>
        <p>ID</p>
        <p>Tiêu đề</p>
        <p>Giá cũ</p>
        <p>Giá mới</p>
        <p>Loại</p>
        <p>Xóa</p>
      </div>

      <div className="listproduct-allproducts">
        {allProducts.map((product, index) => (
          <div key={index} className="listproduct-format-main listproduct-row">
            <img src={product.image} alt="product" className="image-product" />
            <p>{product.id || index + 1}</p>
            <p className="nowrap">{product.name}</p>
            <p>{product.old_price}</p>
            <p>{product.new_price}</p>
            <p>{product.category}</p>
            <img
              src={cross_icon}
              alt="Xóa"
              className="listproduct-remove-icon"
              onClick={() => remove_product(product.id)}
              title="Xóa sản phẩm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
