import { Router } from "express";
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

export default postRouter;
