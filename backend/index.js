const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const jwt = require("jsonwebtoken");

const { type } = require("os");
const { error } = require("console");

app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect(
  "mongodb+srv://gtmailong:123@cluster0.xemogvx.mongodb.net/ShopThoiTrang?retryWrites=true&w=majority",
);

// Kiểm tra API chính
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Cấu hình Multer lưu file
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});
const upload = multer({ storage: storage });

// Tạo folder static cho ảnh
app.use("/images", express.static("upload/images"));

// API upload ảnh
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Start server
app.listen(port, () => {
  console.log("Server Running on Port " + port);
});

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: { type: Boolean, default: true },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;

  if (products.length > 0) {
    let last_product_array = products.slice(-1); // ✅ dùng 'products'
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id, // ✅ tự sinh id
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  console.log(product);

  try {
    await product.save();
    console.log("Saved");
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error("Error saving product:", error.message);
    res.status(500).json({ success: false, message: "Failed to save product" });
  }
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Remove");
  res.json({
    success: true,
    name: req.body.name,
  });
});

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }
  }
};

// add to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData },
  );
  res.send("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData },
  );
  res.send("Remove");
});

// get cart
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
}); // popular in women

app.get("/popularinwomen", async (req, res) => {
  try {
    let popular_in_women = await Product.find({ category: "women" }).limit(4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
  } catch (error) {
    console.error("Error fetching popular products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// new collection
app.get("/newcollection", async (req, res) => {
  try {
    let newcollection = await Product.find({})
      .sort({ date: -1 }) // Mới nhất trước
      .limit(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch new collection" });
  }
});

// Creating API for getting all product
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products Fetched");
  res.send(products);
});

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with the same email address",
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

const Order = mongoose.model("Order", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveryDate: {
    type: Date,
  },
});

app.post("/placeorder", fetchUser, async (req, res) => {
  console.log("Bắt đầu xử lý đặt hàng"); // Thêm log

  try {
    console.log("User ID:", req.user.id); // Log user ID
    let userData = await Users.findOne({ _id: req.user.id });
    console.log("User data:", userData); // Log user data

    if (!userData || Object.keys(userData.cartData).length === 0) {
      console.log("Giỏ hàng trống"); // Log trường hợp giỏ hàng trống
      return res.status(400).json({
        success: false,
        message: "Giỏ hàng trống",
      });
    }

    // Thêm log giỏ hàng
    console.log("Giỏ hàng hiện tại:", userData.cartData);

    let totalAmount = 0;
    for (const [productId, quantity] of Object.entries(userData.cartData)) {
      if (quantity > 0) {
        const product = await Product.findOne({ id: productId });
        console.log(`Sản phẩm ${productId}:`, product); // Log từng sản phẩm
        if (product) {
          totalAmount += product.new_price * quantity;
        }
      }
    }

    console.log("Tổng tiền tính được:", totalAmount);

    const order = new Order({
      userId: req.user.id,
      items: userData.cartData,
      totalAmount: totalAmount,
    });

    await order.save();
    console.log("Đơn hàng đã lưu:", order); // Log đơn hàng

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // Xóa giỏ hàng
    userData.cartData = cart;
    await userData.save();

    res.json({
      success: true,
      message: "Đặt hàng thành công",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Lỗi chi tiết:", error); // Log lỗi đầy đủ
    res.status(500).json({
      success: false,
      message: error.message || "Lỗi server",
    });
  }
});

app.get("/myorders", fetchUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ purchaseDate: -1 })
      .populate("userId", "name email"); // Lấy thông tin user nếu cần

    // Thêm thông tin chi tiết sản phẩm vào mỗi đơn hàng
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const itemsWithDetails = {};

        for (const [productId, quantity] of Object.entries(order.items)) {
          if (quantity > 0) {
            const product = await Product.findOne({ id: productId });
            if (product) {
              itemsWithDetails[productId] = {
                quantity,
                details: {
                  name: product.name,
                  image: product.image,
                  price: product.new_price,
                },
              };
            }
          }
        }

        return {
          ...order.toObject(),
          itemsWithDetails,
          formattedDate: order.purchaseDate.toLocaleString(),
        };
      }),
    );

    res.json({ success: true, orders: ordersWithDetails });
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

app.post("/confirmdelivery", fetchUser, async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      userId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    // Cập nhật trạng thái và ngày nhận hàng
    order.isDelivered = true;
    order.deliveryDate = new Date(); // Thêm dòng này
    await order.save();

    res.json({
      success: true,
      message: "Xác nhận nhận hàng thành công",
      deliveryDate: order.deliveryDate, // Trả về ngày nhận hàng
    });
  } catch (error) {
    console.error("Lỗi khi xác nhận nhận hàng:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

app.post("/getuser", fetchUser, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password"); // Không trả về password
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
