# 🛍️ HƯỚNG DẪN ĐƠN GIẢN - PRODUCT MODEL

## 🏪 TƯỞNG TƯỢNG NHƯ MỘT CỬA HÀNG ĐIỆN TỬ

```
KHÁCH HÀNG (Client) → BẢO VỆ (app.js) → LỄ TÂN (Router) → QUẢN LÝ KHO (Controller) → KHO HÀNG (MongoDB)
```

---

## 🏗️ CẤU TRÚC ĐƠN GIẢN

### 1️⃣ **app.js** - CỬA VÀO CỬA HÀNG
```javascript
// Khởi tạo cửa hàng
const app = express();

// Đặt bảo vệ ở cửa (morgan - ghi log khách vào)
app.use(morgan("dev"));

// Cho phép khách mang thông tin vào (parse JSON)
app.use(express.json());

// Chia khu vực: khu sản phẩm, khu bài viết, khu người dùng
app.use("/api/products", productRouter);
```

### 2️⃣ **product.js** - LỄ TÂN CỬA HÀNG
```javascript
// Lễ tân hỏi khách muốn gì
productRouter.get("/", getProducts);        // "Tôi muốn xem danh sách sản phẩm"
productRouter.get("/:id", getProductById);  // "Tôi muốn xem sản phẩm số 1"
productRouter.post("/", addProduct);        // "Tôi muốn thêm sản phẩm mới"
productRouter.put("/:id", updateProduct);   // "Tôi muốn sửa sản phẩm đã có"
productRouter.delete("/:id", deleteProduct); // "Tôi muốn xóa sản phẩm"
```

### 3️⃣ **productController.js** - QUẢN LÝ KHO
```javascript
// Quản lý kho kiểm tra và lấy sản phẩm theo yêu cầu
export const getProducts = async (req, res) => {
  // Lấy yêu cầu từ lễ tân
  const { search, category } = req.query;
  
  // Nếu khách muốn tìm sản phẩm đặc biệt
  if (search) {
    // Tìm sản phẩm có tên chứa từ khóa
    products = await Product.find({ 
      name: { $regex: search, $options: 'i' } 
    });
  }
  
  // Đưa sản phẩm cho lễ tân
  return res.json(products);
};
```

### 4️⃣ **Product.js** - QUY ĐỊNH SẢN PHẨM
```javascript
// Quy định về sản phẩm trong kho
const productSchema = new mongoose.Schema({
  name: {
    type: String,        // Tên phải là chữ
    required: true,      // Bắt buộc phải có tên
    trim: true,          // Bỏ khoảng trắng thừa
  },
  price: {
    type: Number,        // Giá phải là số
    required: true,      // Bắt buộc phải có giá
    min: 0,              // Giá không được âm
  },
  stock: {
    type: Number,        // Tồn kho là số
    default: 0,          // Mặc định là 0
    min: 0,              // Không được âm
  },
  isActive: {
    type: Boolean,       // Trạng thái bán/hết
    default: true,       // Mặc định đang bán
  }
});
```

---

## 🔄 LUỒNG CHẠY ĐƠN GIẢN

### Khi bạn gọi API: `GET /api/products?search=iphone`

```
1. 📱 CLIENT: "Tôi muốn xem sản phẩm có tên chứa 'iphone'"

2. 🏢 APP.JS: "Khách muốn vào khu products, chuyển cho lễ tân"

3. 🎯 ROUTER: "Khách muốn xem sản phẩm, gọi quản lý kho getProducts"

4. 👨‍💼 CONTROLLER: 
   - "Tìm sản phẩm có tên chứa 'iphone'"
   - "Đây là danh sách sản phẩm tìm được"

5. 📱 CLIENT: "Cảm ơn, tôi đã nhận được danh sách"
```

---

## 🎯 CÁC LOẠI REQUEST ĐƠN GIẢN

| Method | URL | Ý nghĩa | Ví dụ |
|--------|-----|---------|-------|
| GET | `/api/products` | Xem tất cả sản phẩm | "Cho tôi xem toàn bộ kho" |
| GET | `/api/products?search=iphone` | Tìm kiếm | "Tìm sản phẩm có tên 'iphone'" |
| GET | `/api/products/1` | Xem chi tiết | "Cho tôi xem sản phẩm số 1" |
| POST | `/api/products` | Thêm mới | "Tôi muốn nhập sản phẩm mới" |
| PUT | `/api/products/1` | Sửa | "Sửa thông tin sản phẩm số 1" |
| DELETE | `/api/products/1` | Xóa | "Xóa sản phẩm số 1 khỏi kho" |

---

## 💡 GIẢI THÍCH CODE QUAN TRỌNG

### 🔍 **Tìm kiếm sản phẩm:**
```javascript
// Nếu có từ khóa tìm kiếm
if (search) {
  // Tìm sản phẩm có tên chứa từ khóa (không phân biệt hoa thường)
  products = await Product.find({ 
    name: { $regex: search, $options: 'i' } 
  });
}
```

### 📦 **Thêm sản phẩm mới:**
```javascript
// Tạo sản phẩm mới theo quy định
const newProduct = new Product({
  name: "iPhone 15 Pro",      // Tên sản phẩm
  price: 29990000,            // Giá bán
  stock: 50,                  // Số lượng tồn
  isActive: true              // Đang bán
});

// Lưu vào kho
await newProduct.save();
```

### ❌ **Xử lý lỗi đơn giản:**
```javascript
// Nếu không tìm thấy sản phẩm
if (!product) {
  return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
}

// Nếu có lỗi gì đó
catch (error) {
  return res.status(500).json({ error: "Lỗi server" });
}
```

---

## 🏪 QUY ĐỊNH SẢN PHẨM TRONG KHO

### 📋 **Thông tin bắt buộc:**
```javascript
{
  name: "Tên sản phẩm",        // ✅ Bắt buộc - phải có tên
  description: "Mô tả chi tiết", // ✅ Bắt buộc - phải có mô tả
  price: 1000000,              // ✅ Bắt buộc - phải có giá (≥ 0)
  category: "Điện thoại"       // ✅ Bắt buộc - phải phân loại
}
```

### 📋 **Thông tin tự động:**
```javascript
{
  stock: 0,                    // 🔄 Tự động - mặc định 0
  isActive: true,              // 🔄 Tự động - mặc định đang bán
  createdAt: "2024-01-15",     // 🔄 Tự động - thời gian nhập kho
  updatedAt: "2024-01-15"      // 🔄 Tự động - thời gian cập nhật cuối
}
```

### 📋 **Thông tin tùy chọn:**
```javascript
{
  images: ["url1", "url2"],    // 📷 Tùy chọn - hình ảnh sản phẩm
  tags: ["apple", "smartphone"] // 🏷️ Tùy chọn - thẻ phân loại
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
http://localhost:3000/api/products
http://localhost:3000/api/products?search=iphone
http://localhost:3000/api/products?category=điện thoại
```

### 3. Kết quả:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "iPhone 15 Pro",
    "description": "Điện thoại cao cấp",
    "price": 29990000,
    "category": "Điện thoại",
    "stock": 50,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## 🎨 SƠ ĐỒ TRỰC QUAN

```
📱 CLIENT (Khách hàng)
    ↓ (HTTP Request - Yêu cầu)
🏢 APP.JS (Cửa hàng)
    ↓ (Chuyển đến khu vực)
🎯 ROUTER (Lễ tân)
    ↓ (Gọi quản lý)
👨‍💼 CONTROLLER (Quản lý kho)
    ↓ (Kiểm tra quy định)
📋 SCHEMA (Quy định sản phẩm)
    ↓ (Lưu/lấy dữ liệu)
💾 MONGODB (Kho hàng)
    ↓ (Trả về kết quả)
📱 CLIENT (Nhận sản phẩm)
```

---

## 🏷️ CÁC LOẠI SẢN PHẨM VÍ DỤ

### 📱 **Điện thoại:**
```javascript
{
  name: "iPhone 15 Pro",
  description: "Điện thoại cao cấp với chip A17 Pro",
  price: 29990000,
  category: "Điện thoại",
  stock: 50,
  tags: ["apple", "smartphone", "premium"]
}
```

### 💻 **Laptop:**
```javascript
{
  name: "MacBook Pro M3",
  description: "Laptop chuyên nghiệp cho lập trình",
  price: 45000000,
  category: "Laptop",
  stock: 20,
  tags: ["apple", "laptop", "programming"]
}
```

### 🎧 **Phụ kiện:**
```javascript
{
  name: "AirPods Pro",
  description: "Tai nghe không dây chống ồn",
  price: 5500000,
  category: "Phụ kiện",
  stock: 100,
  tags: ["apple", "earphone", "wireless"]
}
```

---

## ✨ TÓM TẮT

1. **app.js**: Cửa vào cửa hàng, chia khu vực
2. **router**: Lễ tân, hỏi khách muốn gì
3. **controller**: Quản lý kho, kiểm tra và lấy sản phẩm
4. **schema**: Quy định về thông tin sản phẩm
5. **mongodb**: Kho hàng lưu trữ thực tế

**Đơn giản vậy thôi! Giống như quản lý một cửa hàng điện tử thật!** 🎉
