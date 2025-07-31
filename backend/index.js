const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

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

app.post("/appproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = product.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: req.body.id,
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
