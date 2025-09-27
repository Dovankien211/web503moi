// Dữ liệu giả: danh sách bài viết
let posts = [
  { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
  { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];

// GET /api/posts - Lấy danh sách bài viết (có hỗ trợ tìm kiếm)
export const getPosts = (req, res) => {
  try {
    const { search } = req.query;
    
    let filteredPosts = posts;
    
    // Nếu có tham số search, tìm kiếm theo tiêu đề
    if (search) {
      filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Nếu không tìm thấy bài viết nào
    if (filteredPosts.length === 0) {
      return res.status(404).json({ 
        error: search ? "No posts found matching the search criteria" : "No posts found" 
      });
    }
    
    return res.json(filteredPosts);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/posts/:id - Lấy chi tiết bài viết theo id
export const getPostById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/posts - Thêm bài viết mới
export const addPost = (req, res) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const nextId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const newPost = { id: nextId, title, content };
    posts.push(newPost);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/posts/:id - Cập nhật bài viết theo id
export const updatePost = (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { title, content } = req.body || {};
    post.title = title ?? post.title;
    post.content = content ?? post.content;
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/posts/:id - Xóa bài viết theo id
export const deletePost = (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Post not found" });
    posts.splice(index, 1);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Alias để tương thích với code hiện tại
export const getAllPosts = getPosts;
export const createPost = addPost;