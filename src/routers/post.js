import { Router } from "express";
<<<<<<< HEAD

import {
  addPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post.js";

const postRouter = Router();

// GET /api/posts - Lấy danh sách bài viết
postRouter.get("/", getPosts);

// GET /api/posts/:id - Lấy chi tiết bài viết
postRouter.get("/:id", getPostById);

// POST /api/posts - Thêm bài viết mới
postRouter.post("/", addPost);

// DELETE /api/posts/:id - Xóa bài viết
postRouter.delete("/:id", deletePost);

// PUT /api/posts/:id - Cập nhật bài viết
postRouter.put("/:id", updatePost);

=======
import {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
} from "../controller/postController.js";

const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", addPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

>>>>>>> 3041184eb43c278195e07d673609e6874d7b5944
export default postRouter;
