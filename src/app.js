import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import postRouter from "./routers/post.js";

const app = express();

app.use(morgan("dev"));        // Log requests
app.use(express.json());       // Parse JSON body

// Kết nối MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/nodejs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("🚀 API Server đang chạy! Truy cập /api/posts để xem danh sách bài viết");
});

app.use("/api/posts", postRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại: http://localhost:${PORT}`);
  console.log(`📝 API Posts: http://localhost:${PORT}/api/posts`);
});
