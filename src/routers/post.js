import { Router } from "express";
import {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
} from "../controller/postController.js";

const postRouter = Router();

// GET /api/posts - Lấy danh sách bài viết (có hỗ trợ tìm kiếm với ?search=keyword)
postRouter.get("/", getPosts);

// GET /api/posts/:id - Lấy chi tiết bài viết theo id
postRouter.get("/:id", getPostById);

// POST /api/posts - Thêm bài viết mới
postRouter.post("/", addPost);

// PUT /api/posts/:id - Cập nhật bài viết theo id
postRouter.put("/:id", updatePost);

// DELETE /api/posts/:id - Xóa bài viết theo id
postRouter.delete("/:id", deletePost);

export default postRouter;
