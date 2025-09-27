// 1. Dữ liệu giả (thay thế database)
let posts = [
  { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
  { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
  { id: 3, title: "Học Node.js", content: "Hướng dẫn học Node.js từ cơ bản" },
  { id: 4, title: "Express Framework", content: "Tìm hiểu Express.js cho backend" },
];

// 2. GET /api/posts - Lấy danh sách posts (có tìm kiếm)
export const getPosts = (req, res) => {
  try {
    // Lấy từ khóa tìm kiếm từ query
    const { search } = req.query;
    
    let result = posts;
    
    // Nếu có từ khóa tìm kiếm
    if (search) {
      result = posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Kiểm tra kết quả
    if (result.length === 0) {
      return res.status(404).json({ 
        error: search ? "Không tìm thấy bài viết phù hợp" : "Không có bài viết nào" 
      });
    }
    
    // Trả về kết quả
    res.json(result);
    
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// 3. GET /api/posts/:id - Lấy post theo ID
export const getPostById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    
    if (!post) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    
    res.json(post);
    
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// 4. POST /api/posts - Tạo post mới
export const addPost = (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Kiểm tra dữ liệu đầu vào
    if (!title || !content) {
      return res.status(400).json({ 
        error: "Title và content là bắt buộc" 
      });
    }
    
    // Tạo ID mới
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    
    // Tạo post mới
    const newPost = { id: newId, title, content };
    posts.push(newPost);
    
    // Trả về post vừa tạo
    res.status(201).json(newPost);
    
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// 5. PUT /api/posts/:id - Cập nhật post
export const updatePost = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    
    if (!post) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    
    // Cập nhật dữ liệu
    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    
    res.json(post);
    
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// 6. DELETE /api/posts/:id - Xóa post
export const deletePost = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    
    // Xóa post
    posts.splice(index, 1);
    
    res.json({ success: true, message: "Xóa thành công" });
    
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};