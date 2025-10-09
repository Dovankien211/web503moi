import Post from "../models/post.model.js";

// Lấy danh sách bài viết, có hỗ trợ tìm kiếm
export const getPosts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    const posts = await Post.find(query);
    if (posts.length === 0) {
      return res.status(404).json({ error: search ? "Không tìm thấy bài viết phù hợp" : "Không có bài viết nào" });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Lấy bài viết theo ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Không tìm thấy bài viết" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Tạo bài viết mới
export const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Tiêu đề và nội dung là bắt buộc" });
    }
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Cập nhật bài viết
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPost) return res.status(404).json({ error: "Không tìm thấy bài viết" });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Xóa bài viết
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Không tìm thấy bài viết" });
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};
