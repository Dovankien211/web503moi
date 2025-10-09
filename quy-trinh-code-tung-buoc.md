# 🚀 QUY TRÌNH CODE LẠI BÀI TỪNG BƯỚC

## 📁 **BƯỚC 1: TẠO CẤU TRÚC THỦ MỤC**

```
nodejs-web503-fall25/
├── src/
│   ├── controllers/
│   │   └── postController.js
│   ├── routers/
│   │   └── post.js
│   └── app.js
├── package.json
└── .babelrc
```

---

## 📦 **BƯỚC 2: KHỞI TẠO PACKAGE.JSON**

Tạo file `package.json`:

```json
{
  "name": "nodejs-web503-fall25",
  "version": "1.0.0",
  "description": "Node.js/Express API với tìm kiếm posts",
  "main": "src/app.js",
  "scripts": {
    "dev": "nodemon --exec babel-node src/app.js",
    "start": "node src/app.js"
  },
  "dependencies": {
    "express": "^5.1.0",
    "morgan": "^1.10.1"
  },
  "devDependencies": {
    "@babel/core": "^7.28.4",
    "@babel/node": "^7.28.0",
    "@babel/preset-env": "^7.28.3",
    "nodemon": "^3.1.10"
  }
}
```

---

## ⚙️ **BƯỚC 3: CẤU HÌNH BABEL**

Tạo file `.babelrc`:

```json
{
  "presets": ["@babel/preset-env"]
}
```

---

## 🏗️ **BƯỚC 4: TẠO APP.JS - SERVER CHÍNH**

Tạo file `src/app.js`:

```javascript
// 1. Import các thư viện cần thiết
import express from "express";
import morgan from "morgan";

// 2. Import router
import postRouter from "./routers/post.js";

// 3. Tạo Express app
const app = express();

// 4. Cấu hình middleware
app.use(morgan("dev"));        // Log requests
app.use(express.json());       // Parse JSON body

// 5. Route chính
app.get("/", (req, res) => {
  res.send("🚀 API Server đang chạy!");
});

// 6. Mount router
app.use("/api/posts", postRouter);

// 7. Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại: http://localhost:${PORT}`);
});
```

---

## 🎯 **BƯỚC 5: TẠO CONTROLLER - XỬ LÝ LOGIC**

Tạo file `src/controllers/postController.js`:

```javascript
// 1. Dữ liệu giả (thay thế database)
let posts = [
  { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
  { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
  { id: 3, title: "Học Node.js", content: "Hướng dẫn học Node.js từ cơ bản" },
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
```

---

## 🛣️ **BƯỚC 6: TẠO ROUTER - ĐỊNH TUYẾN**

Tạo file `src/routers/post.js`:

```javascript
// 1. Import Express Router
import { Router } from "express";

// 2. Import các controller functions
import {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost
} from "../controllers/postController.js";

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
```

---

## 🧪 **BƯỚC 7: CÀI ĐẶT VÀ CHẠY**

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Chạy server:
```bash
npm run dev
```

### 3. Test API:
```bash
# Lấy tất cả posts
curl http://localhost:3000/api/posts

# Tìm kiếm posts
curl "http://localhost:3000/api/posts?search=bài"

# Lấy post theo ID
curl http://localhost:3000/api/posts/1

# Tạo post mới
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Bài mới","content":"Nội dung bài mới"}'

# Cập nhật post
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Bài đã sửa","content":"Nội dung đã sửa"}'

# Xóa post
curl -X DELETE http://localhost:3000/api/posts/1
```

---

## ✅ **BƯỚC 8: KIỂM TRA KẾT QUẢ**

Mở trình duyệt và truy cập:
- `http://localhost:3000` - Trang chủ
- `http://localhost:3000/api/posts` - Danh sách posts
- `http://localhost:3000/api/posts?search=bài` - Tìm kiếm

---

## 🎯 **TÓM TẮT QUY TRÌNH**

1. **Tạo cấu trúc thư mục** 📁
2. **Khởi tạo package.json** 📦
3. **Cấu hình Babel** ⚙️
4. **Tạo app.js** 🏗️
5. **Tạo controller** 🎯
6. **Tạo router** 🛣️
7. **Cài đặt và chạy** 🧪
8. **Kiểm tra kết quả** ✅

**Hoàn thành!** 🎉
