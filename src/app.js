import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import postRouter from "./routers/post.js";
import productRouter from "./routers/product.js";

const app = express();

app.use(morgan("dev"));        // Log requests
app.use(express.json());       // Parse JSON body

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/kien072")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.get("/", (req, res) => {
  res.send(`
    🚀 API Server đang chạy! 
    📝 API Posts: /api/posts
    🛍️ API Products: /api/products
  `);
});

app.use("/api/posts", postRouter);
app.use("/api/products", productRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại: http://localhost:${PORT}`);
  console.log(`📝 API Posts: http://localhost:${PORT}/api/posts`);
  console.log(`🛍️ API Products: http://localhost:${PORT}/api/products`);
});
