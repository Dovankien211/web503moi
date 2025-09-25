import { Router } from "express";

const postRouter = Router();

// Dữ liệu giả: danh sách bài viết
let posts = [
  { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
  { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];

// GET /api/posts - Lấy toàn bộ danh sách bài viết (cơ bản)
postRouter.get("/", (req, res) => {
  return res.json(posts);
});

// GET /api/posts/:id - Lấy chi tiết bài viết theo id
postRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  return res.json(post);
});

// POST /api/posts - Thêm bài viết mới
postRouter.post("/", (req, res) => {
  const { title, content } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newPost = { id: Date.now(), title, content };
  posts.push(newPost);
  return res.status(201).json(newPost);
});

// PUT /api/posts/:id - Cập nhật bài viết theo id
postRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const { title, content } = req.body || {};
  post.title = title ?? post.title;
  post.content = content ?? post.content;

  return res.json(post);
});

// DELETE /api/posts/:id - Xóa bài viết theo id
postRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });

  posts.splice(index, 1);
  return res.json({ success: true });
});

export default postRouter;
