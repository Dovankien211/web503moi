# 🚀 HƯỚNG DẪN ĐƠN GIẢN - LUỒNG CHẠY API

## 📱 TƯỞNG TƯỢNG NHƯ MỘT NHÀ HÀNG

```
KHÁCH HÀNG (Client) → BẢO VỆ (app.js) → LỄ TÂN (Router) → ĐẦU BẾP (Controller) → KHO (Database)
```

---

## 🏗️ CẤU TRÚC ĐƠN GIẢN

### 1️⃣ **app.js** - CỬA VÀO NHÀ HÀNG
```javascript
// Khởi tạo nhà hàng
const app = express();

// Đặt bảo vệ ở cửa (morgan - ghi log khách vào)
app.use(morgan("dev"));

// Cho phép khách mang đồ ăn vào (parse JSON)
app.use(express.json());

// Chia khu vực: khu posts, khu users, khu products
app.use("/api/posts", postRouter);
```

### 2️⃣ **post.js** - LỄ TÂN
```javascript
// Lễ tân hỏi khách muốn gì
postRouter.get("/", getPosts);        // "Tôi muốn xem menu"
postRouter.get("/:id", getPostById);  // "Tôi muốn xem món số 1"
postRouter.post("/", addPost);        // "Tôi muốn đặt món mới"
postRouter.put("/:id", updatePost);   // "Tôi muốn sửa món đã đặt"
postRouter.delete("/:id", deletePost); // "Tôi muốn hủy món"
```

### 3️⃣ **postController.js** - ĐẦU BẾP
```javascript
// Đầu bếp nấu món theo yêu cầu
export const getPosts = (req, res) => {
  // Lấy yêu cầu từ lễ tân
  const { search } = req.query;
  
  // Nếu khách muốn tìm món đặc biệt
  if (search) {
    // Tìm món có tên chứa từ khóa
    filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Đưa món cho lễ tân
  return res.json(filteredPosts);
};
```

---

## 🔄 LUỒNG CHẠY ĐƠN GIẢN

### Khi bạn gọi API: `GET /api/posts?search=bài`

```
1. 📱 CLIENT: "Tôi muốn xem món có tên chứa 'bài'"

2. 🏢 APP.JS: "Khách muốn vào khu posts, chuyển cho lễ tân"

3. 🎯 ROUTER: "Khách muốn xem menu, gọi đầu bếp getPosts"

4. 👨‍🍳 CONTROLLER: 
   - "Tìm món có tên chứa 'bài'"
   - "Đây là danh sách món tìm được"

5. 📱 CLIENT: "Cảm ơn, tôi đã nhận được menu"
```

---

## 🎯 CÁC LOẠI REQUEST ĐƠN GIẢN

| Method | URL | Ý nghĩa | Ví dụ |
|--------|-----|---------|-------|
| GET | `/api/posts` | Xem tất cả | "Cho tôi xem menu" |
| GET | `/api/posts?search=bài` | Tìm kiếm | "Tìm món có tên 'bài'" |
| GET | `/api/posts/1` | Xem chi tiết | "Cho tôi xem món số 1" |
| POST | `/api/posts` | Tạo mới | "Tôi muốn đặt món mới" |
| PUT | `/api/posts/1` | Sửa | "Sửa món số 1" |
| DELETE | `/api/posts/1` | Xóa | "Hủy món số 1" |

---

## 💡 GIẢI THÍCH CODE QUAN TRỌNG

### 🔍 **Tìm kiếm đơn giản:**
```javascript
// Nếu có từ khóa tìm kiếm
if (search) {
  // Lọc món có tên chứa từ khóa (không phân biệt hoa thường)
  filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase())
  );
}
```

### ❌ **Xử lý lỗi đơn giản:**
```javascript
// Nếu không tìm thấy gì
if (filteredPosts.length === 0) {
  return res.status(404).json({ error: "Không tìm thấy" });
}

// Nếu có lỗi gì đó
catch (error) {
  return res.status(500).json({ error: "Lỗi server" });
}
```

---

## 🧪 CÁCH TEST ĐƠN GIẢN

### 1. Khởi động server:
```bash
npm run dev
```

### 2. Mở trình duyệt hoặc Postman:
```
http://localhost:3000/api/posts
http://localhost:3000/api/posts?search=bài
```

### 3. Kết quả:
```json
[
  { "id": 1, "title": "Bài viết 1", "content": "Nội dung bài viết 1" },
  { "id": 2, "title": "Bài viết 2", "content": "Nội dung bài viết 2" }
]
```

---

## 🎨 SƠ ĐỒ TRỰC QUAN

```
📱 CLIENT
    ↓ (HTTP Request)
🏢 APP.JS (Server)
    ↓ (Route to)
🎯 ROUTER (post.js)
    ↓ (Call function)
👨‍🍳 CONTROLLER (postController.js)
    ↓ (Process data)
💾 DATABASE (Array posts)
    ↓ (Return data)
📱 CLIENT (Update UI)
```

---

## ✨ TÓM TẮT

1. **app.js**: Cửa vào, chia khu vực
2. **router**: Lễ tân, hỏi khách muốn gì
3. **controller**: Đầu bếp, nấu món theo yêu cầu
4. **database**: Kho chứa nguyên liệu (hiện tại là mảng giả)

**Đơn giản vậy thôi!** 🎉
