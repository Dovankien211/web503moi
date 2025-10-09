# 🧪 HƯỚNG DẪN TEST API

## 🚀 **KHỞI ĐỘNG SERVER**

```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

---

## 📋 **CÁC ENDPOINT CÓ THỂ TEST**

### 1. **GET /api/posts** - Lấy tất cả posts
```
URL: http://localhost:3000/api/posts
Method: GET
Kết quả: Danh sách tất cả posts
```

### 2. **GET /api/posts?search=keyword** - Tìm kiếm posts
```
URL: http://localhost:3000/api/posts?search=bài
URL: http://localhost:3000/api/posts?search=node
URL: http://localhost:3000/api/posts?search=express
Method: GET
Kết quả: Posts có title chứa từ khóa
```

### 3. **GET /api/posts/:id** - Lấy post theo ID
```
URL: http://localhost:3000/api/posts/1
URL: http://localhost:3000/api/posts/2
Method: GET
Kết quả: Post có ID tương ứng
```

### 4. **POST /api/posts** - Tạo post mới
```
URL: http://localhost:3000/api/posts
Method: POST
Body (JSON):
{
  "title": "Bài viết mới",
  "content": "Nội dung bài viết mới"
}
```

### 5. **PUT /api/posts/:id** - Cập nhật post
```
URL: http://localhost:3000/api/posts/1
Method: PUT
Body (JSON):
{
  "title": "Tiêu đề đã sửa",
  "content": "Nội dung đã sửa"
}
```

### 6. **DELETE /api/posts/:id** - Xóa post
```
URL: http://localhost:3000/api/posts/1
Method: DELETE
Kết quả: {"success": true, "message": "Xóa thành công"}
```

---

## 🛠️ **CÁCH TEST**

### **1. Sử dụng trình duyệt:**
- Mở: `http://localhost:3000/api/posts`
- Mở: `http://localhost:3000/api/posts?search=bài`

### **2. Sử dụng Postman/Thunder Client:**
- Import các request trên vào Postman
- Test từng endpoint

### **3. Sử dụng curl (Terminal):**
```bash
# Lấy tất cả posts
curl http://localhost:3000/api/posts

# Tìm kiếm
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

## ✅ **KẾT QUẢ MONG ĐỢI**

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

### **POST /api/posts:**
```json
{
  "id": 5,
  "title": "Bài viết mới",
  "content": "Nội dung bài viết mới"
}
```

---

## 🎯 **CÁC TRƯỜNG HỢP LỖI**

### **404 - Không tìm thấy:**
```json
{
  "error": "Không tìm thấy bài viết"
}
```

### **400 - Dữ liệu không hợp lệ:**
```json
{
  "error": "Title và content là bắt buộc"
}
```

### **500 - Lỗi server:**
```json
{
  "error": "Lỗi server"
}
```

---

## 🎉 **HOÀN THÀNH!**

Bạn đã có một API hoàn chỉnh với đầy đủ chức năng CRUD và tìm kiếm!
