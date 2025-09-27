// Dữ liệu giả: danh sách bài viết
let posts = [
  { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
  { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];

class PostController {
  // GET /api/posts
  static getAllPosts(req, res) {
    return res.json(posts);
  }

  // GET /api/posts/:id
  static getPostById(req, res) {
    const id = Number(req.params.id);
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    return res.json(post);
  }

  // POST /api/posts
  static createPost(req, res) {
    const { title, content } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const nextId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const newPost = { id: nextId, title, content };
    posts.push(newPost);
    return res.status(201).json(newPost);
  }

  // PUT /api/posts/:id
  static updatePost(req, res) {
    const id = Number(req.params.id);
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { title, content } = req.body || {};
    post.title = title ?? post.title;
    post.content = content ?? post.content;
    return res.json(post);
  }

  // DELETE /api/posts/:id
  static deletePost(req, res) {
    const id = Number(req.params.id);
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Post not found" });
    posts.splice(index, 1);
    return res.json({ success: true });
  }
}

export default PostController;