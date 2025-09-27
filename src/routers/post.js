// 1. Import Express Router
import { Router } from "express";

// 2. Import các controller functions
import {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost
} from "../controller/postController.js";

// 3. Tạo router instance
const postRouter = Router();

// 4. Định nghĩa các routes
postRouter.get("/", getPosts);           // GET /api/posts
postRouter.get("/:id", getPostById);     // GET /api/posts/:id
postRouter.post("/", addPost);           // POST /api/posts
postRouter.put("/:id", updatePost);      // PUT /api/posts/:id
postRouter.delete("/:id", deletePost);   // DELETE /api/posts/:id

// 5. Export router
export default postRouter;
