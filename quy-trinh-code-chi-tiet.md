# 🚀 QUY TRÌNH CODE TỪNG BƯỚC - CÓ CODE ĐI KÈM

## 📋 **QUY TRÌNH TỔNG QUAN**

```
1. app.js (Server chính)
2. controller/postController.js (Logic xử lý)  
3. routers/post.js (Định tuyến)
4. Test API
```

---

## 🏗️ **BƯỚC 1: TẠO APP.JS - SERVER CHÍNH**

**File:** `src/app.js`

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
  res.send("🚀 API Server đang chạy! Truy cập /api/posts để xem danh sách bài viết");
});

// 6. Mount router
app.use("/api/posts", postRouter);

// 7. Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại: http://localhost:${PORT}`);
  console.log(`📝 API Posts: http://localhost:${PORT}/api/posts`);
  console.log(`🔍 Tìm kiếm: http://localhost:${PORT}/api/posts?search=keyword`);
});
```

**Giải thích:**
- Dòng 1-2: Import Express và Morgan
- Dòng 5: Import router (sẽ tạo sau)
- Dòng 8: Tạo app Express
- Dòng 11-12: Cấu hình middleware
- Dòng 15-17: Route chính "/"
- Dòng 20: Mount postRouter vào "/api/posts"
- Dòng 23-29: Khởi động server

---

## 🎯 **BƯỚC 2: TẠO CONTROLLER - XỬ LÝ LOGIC**

**File:** `src/controller/postController.js`

```javascript
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
```

**Giải thích từng function:**

### **getPosts (dòng 9-36):**
- Lấy `search` từ `req.query` (URL parameter)
- Nếu có search: lọc posts có title chứa từ khóa
- Nếu không tìm thấy: trả về 404
- Nếu có lỗi: trả về 500

### **getPostById (dòng 39-52):**
- Chuyển `req.params.id` thành số
- Tìm post có ID tương ứng
- Nếu không tìm thấy: trả về 404

### **addPost (dòng 55-78):**
- Lấy `title` và `content` từ `req.body`
- Kiểm tra dữ liệu đầu vào
- Tạo ID mới (ID lớn nhất + 1)
- Thêm post mới vào mảng

### **updatePost (dòng 81-98):**
- Tìm post cần cập nhật
- Cập nhật title/content nếu có
- Trả về post đã cập nhật

### **deletePost (dòng 101-118):**
- Tìm index của post cần xóa
- Xóa post khỏi mảng bằng `splice()`
- Trả về thông báo thành công

---

## 🛣️ **BƯỚC 3: TẠO ROUTER - ĐỊNH TUYẾN**

**File:** `src/routers/post.js`

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
```

**Giải thích:**
- Dòng 2: Import Router từ Express
- Dòng 5-11: Import tất cả controller functions
- Dòng 14: Tạo router instance
- Dòng 17-21: Định nghĩa 5 routes chính
- Dòng 24: Export router để sử dụng trong app.js

---

## 🧪 **BƯỚC 4: TEST API**

### **1. Khởi động server:**
```bash
npm run dev
```

### **2. Test bằng trình duyệt:**
```
http://localhost:3000/api/posts
http://localhost:3000/api/posts?search=bài
http://localhost:3000/api/posts/1
```

### **3. Test bằng curl:**
```bash
# Lấy tất cả posts
curl http://localhost:3000/api/posts

# Tìm kiếm
curl "http://localhost:3000/api/posts?search=bài"

# Tạo post mới
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Bài mới","content":"Nội dung bài mới"}'
```

---

## 📊 **KẾT QUẢ MONG ĐỢI**

### **GET /api/posts:**
```json
[
  {
    "id": 1,
    "title": "Bài viết 1",
    "content": "Nội dung bài viết 1"
  },
  {
    "id": 2,
    "title": "Bài viết 2",
    "content": "Nội dung bài viết 2"
  },
  {
    "id": 3,
    "title": "Học Node.js",
    "content": "Hướng dẫn học Node.js từ cơ bản"
  },
  {
    "id": 4,
    "title": "Express Framework",
    "content": "Tìm hiểu Express.js cho backend"
  }
]
```

### **GET /api/posts?search=bài:**
```json
[
  {
    "id": 1,
    "title": "Bài viết 1",
    "content": "Nội dung bài viết 1"
  },
  {
    "id": 2,
    "title": "Bài viết 2",
    "content": "Nội dung bài viết 2"
  }
]
```

---

## 🎯 **TÓM TẮT QUY TRÌNH**

1. **Tạo app.js** → Server chính, cấu hình middleware
2. **Tạo postController.js** → Logic xử lý CRUD + tìm kiếm
3. **Tạo post.js** → Định tuyến các endpoint
4. **Test API** → Kiểm tra hoạt động

**Kết quả:** API hoàn chỉnh với đầy đủ chức năng! 🎉
