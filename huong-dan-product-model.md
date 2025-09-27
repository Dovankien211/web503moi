# 🛍️ HƯỚNG DẪN PRODUCT MODEL

## 📁 **FILE: src/models/Product.js**

```javascript
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    images: [{
      type: String,
    }],
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
```

---

## 🔍 **GIẢI THÍCH CHI TIẾT**

### **📋 Các trường dữ liệu:**

#### **1. name (String, required)**
```javascript
name: {
  type: String,
  required: true,
  trim: true,
}
```
- **Ý nghĩa:** Tên sản phẩm
- **Bắt buộc:** Có
- **trim:** Loại bỏ khoảng trắng đầu cuối

#### **2. description (String, required)**
```javascript
description: {
  type: String,
  required: true,
}
```
- **Ý nghĩa:** Mô tả chi tiết sản phẩm
- **Bắt buộc:** Có

#### **3. price (Number, required)**
```javascript
price: {
  type: Number,
  required: true,
  min: 0,
}
```
- **Ý nghĩa:** Giá sản phẩm
- **Bắt buộc:** Có
- **min: 0:** Giá không được âm

#### **4. category (String, required)**
```javascript
category: {
  type: String,
  required: true,
  trim: true,
}
```
- **Ý nghĩa:** Danh mục sản phẩm
- **Bắt buộc:** Có
- **trim:** Loại bỏ khoảng trắng đầu cuối

#### **5. stock (Number, default: 0)**
```javascript
stock: {
  type: Number,
  default: 0,
  min: 0,
}
```
- **Ý nghĩa:** Số lượng tồn kho
- **Mặc định:** 0
- **min: 0:** Không được âm

#### **6. isActive (Boolean, default: true)**
```javascript
isActive: {
  type: Boolean,
  default: true,
}
```
- **Ý nghĩa:** Trạng thái hoạt động của sản phẩm
- **Mặc định:** true (đang bán)

#### **7. images (Array of Strings)**
```javascript
images: [{
  type: String,
}]
```
- **Ý nghĩa:** Danh sách URL hình ảnh
- **Kiểu:** Mảng các chuỗi

#### **8. tags (Array of Strings)**
```javascript
tags: [{
  type: String,
  trim: true,
}]
```
- **Ý nghĩa:** Các thẻ tag cho sản phẩm
- **trim:** Loại bỏ khoảng trắng đầu cuối

### **⏰ Timestamps**
```javascript
{
  timestamps: true,
}
```
- **Tự động tạo:** `createdAt` và `updatedAt`
- **createdAt:** Thời gian tạo
- **updatedAt:** Thời gian cập nhật cuối

---

## 🆚 **SO SÁNH VỚI POST MODEL**

| **Post Model** | **Product Model** | **Lý do thay đổi** |
|----------------|-------------------|-------------------|
| `title` | `name` | Sản phẩm có tên, không phải tiêu đề |
| `content` | `description` | Mô tả sản phẩm thay vì nội dung bài viết |
| - | `price` | Sản phẩm cần có giá |
| - | `category` | Phân loại sản phẩm |
| `viewCount` | `stock` | Số lượng tồn kho thay vì lượt xem |
| `isPublished` | `isActive` | Trạng thái hoạt động thay vì xuất bản |
| - | `images` | Hình ảnh sản phẩm |
| - | `tags` | Thẻ tag cho sản phẩm |

---

## 📝 **VÍ DỤ SỬ DỤNG**

### **Tạo sản phẩm mới:**
```javascript
const newProduct = new Product({
  name: "iPhone 15 Pro",
  description: "Điện thoại thông minh cao cấp với chip A17 Pro",
  price: 29990000,
  category: "Điện thoại",
  stock: 50,
  images: ["https://example.com/iphone1.jpg", "https://example.com/iphone2.jpg"],
  tags: ["apple", "smartphone", "premium"]
});

await newProduct.save();
```

### **Tìm kiếm sản phẩm:**
```javascript
// Tìm theo category
const phones = await Product.find({ category: "Điện thoại" });

// Tìm sản phẩm đang hoạt động
const activeProducts = await Product.find({ isActive: true });

// Tìm theo giá
const expensiveProducts = await Product.find({ price: { $gte: 10000000 } });
```

### **Cập nhật tồn kho:**
```javascript
const product = await Product.findById(productId);
product.stock -= quantity;
await product.save();
```

---

## 🔧 **CÁCH TÍCH HỢP VÀO DỰ ÁN**

### **1. Cài đặt Mongoose:**
```bash
npm install mongoose
```

### **2. Kết nối database trong app.js:**
```javascript
import mongoose from "mongoose";

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

### **3. Import model trong controller:**
```javascript
import Product from "../models/Product.js";
```

### **4. Sử dụng trong controller:**
```javascript
// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};
```

---

## ✅ **HOÀN THÀNH**

Product model đã được tạo với đầy đủ các trường cần thiết cho một hệ thống quản lý sản phẩm! 🎉
