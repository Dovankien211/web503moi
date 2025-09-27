// 1. Import các thư viện cần thiết
import express from "express";
import morgan from "morgan";

// 2. Import router
import postRouter from "./routers/post.js";

// 3. Tạo Express app
const app = express();

// 4. Cấu hình middleware
app.use(morgan("dev"));        // Log requests
app.use(express.json());       // Parse JSON body

// 5. Route chính
app.get("/", (req, res) => {
  res.send("🚀 API Server đang chạy! Truy cập /api/posts để xem danh sách bài viết");
});

// 6. Mount router
app.use("/api/posts", postRouter);

// 7. Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại: http://localhost:${PORT}`);
  console.log(`📝 API Posts: http://localhost:${PORT}/api/posts`);
  console.log(`🔍 Tìm kiếm: http://localhost:${PORT}/api/posts?search=keyword`);
});
