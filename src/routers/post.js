import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controller/postController.js";


const postRouter = Router();



// GET /api/posts - Lấy toàn bộ danh sách bài viết (cơ bản)
postRouter.get("/", getAllPosts);

// GET /api/posts/:id - Lấy chi tiết bài viết theo id
postRouter.get("/:id", getPostById);

// POST /api/posts - Thêm bài viết mới
postRouter.post("/", createPost);

// PUT /api/posts/:id - Cập nhật bài viết theo id
postRouter.put("/:id", updatePost);

// DELETE /api/posts/:id - Xóa bài viết theo id
postRouter.delete("/:id", deletePost);

export default postRouter;
