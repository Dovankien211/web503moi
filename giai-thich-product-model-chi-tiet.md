# 🔍 GIẢI THÍCH CODE PRODUCT MODEL CHI TIẾT

## 📁 **FILE: src/models/Product.js**

### **🔧 PHẦN 1: IMPORT VÀ KHỞI TẠO**

```javascript
import mongoose from "mongoose";
```
**Giải thích:**
- Import thư viện Mongoose để làm việc với MongoDB
- Mongoose là ODM (Object Document Mapper) giúp tương tác với database dễ dàng

---

### **🏗️ PHẦN 2: ĐỊNH NGHĨA SCHEMA**

```javascript
const productSchema = new mongoose.Schema(
  {
    // Các trường dữ liệu ở đây...
  },
  {
    timestamps: true,
  }
);
```

**Giải thích:**
- `new mongoose.Schema()`: Tạo schema (cấu trúc) cho collection
- Tham số 1: Định nghĩa các trường dữ liệu
- Tham số 2: Cấu hình options (timestamps: true)

---

### **📋 PHẦN 3: CÁC TRƯỜNG DỮ LIỆU CHI TIẾT**

#### **1. Trường NAME:**
```javascript
name: {
  type: String,
  required: true,
  trim: true,
}
```
**Giải thích từng thuộc tính:**
- `type: String`: Kiểu dữ liệu là chuỗi
- `required: true`: Bắt buộc phải có (không được null/undefined)
- `trim: true`: Tự động loại bỏ khoảng trắng đầu và cuối

**Ví dụ:**
```javascript
// Input: "  iPhone 15 Pro  "
// Kết quả lưu: "iPhone 15 Pro"
```

#### **2. Trường DESCRIPTION:**
```javascript
description: {
  type: String,
  required: true,
}
```
**Giải thích:**
- `type: String`: Kiểu chuỗi
- `required: true`: Bắt buộc phải có
- Không có `trim` vì mô tả có thể có khoảng trắng đầu cuối

#### **3. Trường PRICE:**
```javascript
price: {
  type: Number,
  required: true,
  min: 0,
}
```
**Giải thích:**
- `type: Number`: Kiểu số
- `required: true`: Bắt buộc
- `min: 0`: Giá trị tối thiểu là 0 (không cho phép giá âm)

**Validation tự động:**
```javascript
// ✅ Hợp lệ
price: 100000

// ❌ Lỗi: "Path `price` (-100) is less than minimum allowed value (0)."
price: -100
```

#### **4. Trường CATEGORY:**
```javascript
category: {
  type: String,
  required: true,
  trim: true,
}
```
**Giải thích:**
- Tương tự như `name`
- Dùng để phân loại sản phẩm

#### **5. Trường STOCK:**
```javascript
stock: {
  type: Number,
  default: 0,
  min: 0,
}
```
**Giải thích:**
- `type: Number`: Kiểu số
- `default: 0`: Giá trị mặc định là 0 nếu không cung cấp
- `min: 0`: Không cho phép số âm

**Ví dụ:**
```javascript
// Không cung cấp stock
const product = new Product({ name: "iPhone", price: 1000000 });
console.log(product.stock); // 0 (tự động set default)

// Cung cấp stock
const product2 = new Product({ name: "iPhone", price: 1000000, stock: 50 });
console.log(product2.stock); // 50
```

#### **6. Trường ISACTIVE:**
```javascript
isActive: {
  type: Boolean,
  default: true,
}
```
**Giải thích:**
- `type: Boolean`: Kiểu true/false
- `default: true`: Mặc định sản phẩm đang hoạt động

#### **7. Trường IMAGES (Mảng):**
```javascript
images: [{
  type: String,
}]
```
**Giải thích:**
- `images: [...]`: Định nghĩa mảng
- `type: String`: Mỗi phần tử trong mảng là chuỗi (URL hình ảnh)

**Ví dụ:**
```javascript
const product = new Product({
  name: "iPhone",
  images: [
    "https://example.com/iphone1.jpg",
    "https://example.com/iphone2.jpg",
    "https://example.com/iphone3.jpg"
  ]
});
```

#### **8. Trường TAGS (Mảng):**
```javascript
tags: [{
  type: String,
  trim: true,
}]
```
**Giải thích:**
- Tương tự `images` nhưng là mảng các thẻ tag
- `trim: true`: Loại bỏ khoảng trắng của từng tag

---

### **⏰ PHẦN 4: TIMESTAMPS**

```javascript
{
  timestamps: true,
}
```
**Giải thích:**
- `timestamps: true`: Tự động thêm 2 trường
- `createdAt`: Thời gian tạo record
- `updatedAt`: Thời gian cập nhật cuối

**Kết quả:**
```javascript
{
  name: "iPhone",
  createdAt: "2024-01-15T10:30:00.000Z",
  updatedAt: "2024-01-15T10:30:00.000Z"
}
```

---

### **🏭 PHẦN 5: TẠO MODEL**

```javascript
const Product = mongoose.model("Product", productSchema);
export default Product;
```
**Giải thích:**
- `mongoose.model("Product", productSchema)`: Tạo model từ schema
- Tham số 1: Tên model ("Product")
- Tham số 2: Schema đã định nghĩa
- `export default`: Xuất model để sử dụng ở file khác

---

## 🔄 **LUỒNG CHẠY CHI TIẾT**

### **📊 BƯỚC 1: IMPORT MODEL**
```javascript
import Product from "../models/Product.js";
```
**Luồng chạy:**
1. Node.js đọc file `Product.js`
2. Thực thi code trong file
3. Tạo schema và model
4. Export model
5. Import vào file khác

### **📊 BƯỚC 2: SỬ DỤNG MODEL**

#### **Tạo sản phẩm mới:**
```javascript
const newProduct = new Product({
  name: "iPhone 15 Pro",
  description: "Điện thoại cao cấp",
  price: 29990000,
  category: "Điện thoại",
  stock: 50
});

await newProduct.save();
```

**Luồng chạy:**
1. `new Product()`: Tạo instance từ model
2. Truyền dữ liệu vào constructor
3. Mongoose validate dữ liệu theo schema
4. Nếu hợp lệ → tạo object
5. Nếu không hợp lệ → throw error
6. `save()`: Lưu vào database MongoDB

#### **Validation tự động:**
```javascript
// Mongoose tự động validate:
✅ name: "iPhone" (String, required)
✅ price: 1000000 (Number, required, >= 0)
✅ stock: 50 (Number, default: 0, >= 0)
✅ isActive: true (Boolean, default: true)
✅ createdAt: tự động set
✅ updatedAt: tự động set
```

### **📊 BƯỚC 3: TRUY VẤN DATABASE**

#### **Tìm tất cả sản phẩm:**
```javascript
const products = await Product.find({});
```

**Luồng chạy:**
1. `Product.find({})`: Gọi method find của model
2. Mongoose chuyển thành MongoDB query
3. Kết nối đến MongoDB
4. Thực thi query: `db.products.find({})`
5. Trả về kết quả
6. Mongoose parse kết quả thành JavaScript objects

#### **Tìm theo điều kiện:**
```javascript
const phones = await Product.find({ category: "Điện thoại" });
```

**Luồng chạy:**
1. `{ category: "Điện thoại" }`: Điều kiện tìm kiếm
2. MongoDB query: `db.products.find({ category: "Điện thoại" })`
3. Trả về các sản phẩm có category = "Điện thoại"

### **📊 BƯỚC 4: CẬP NHẬT DỮ LIỆU**

```javascript
const product = await Product.findById(productId);
product.stock -= quantity;
await product.save();
```

**Luồng chạy:**
1. `findById()`: Tìm sản phẩm theo ID
2. Thay đổi giá trị `stock`
3. `save()`: Lưu thay đổi
4. Mongoose tự động update `updatedAt`
5. Gửi query update đến MongoDB

---

## 🎯 **TÓM TẮT LUỒNG CHẠY**

```
1. Import Model → 2. Tạo Instance → 3. Validation → 4. Save to DB
     ↓                    ↓               ↓              ↓
Node.js đọc file    new Product()    Schema check    MongoDB query
     ↓                    ↓               ↓              ↓
Export Model        Constructor     Auto validate   Database response
```

## 🔧 **CÁC TRƯỜNG HỢP LỖI**

### **1. Validation Error:**
```javascript
// ❌ Lỗi: required field missing
const product = new Product({ price: 1000000 }); // thiếu name
await product.save(); // throw ValidationError
```

### **2. Type Error:**
```javascript
// ❌ Lỗi: wrong type
const product = new Product({ 
  name: "iPhone", 
  price: "not a number" // phải là Number
});
```

### **3. Min Value Error:**
```javascript
// ❌ Lỗi: value too small
const product = new Product({ 
  name: "iPhone", 
  price: -100 // phải >= 0
});
```

---

## ✅ **KẾT LUẬN**

Product model hoạt động theo nguyên lý:
1. **Định nghĩa cấu trúc** (Schema)
2. **Validation tự động** (Mongoose)
3. **Chuyển đổi** JavaScript ↔ MongoDB
4. **Tự động quản lý** timestamps và metadata

**Model này đảm bảo dữ liệu luôn đúng định dạng và có thể truy vấn hiệu quả!** 🚀
