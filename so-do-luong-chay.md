# 🎯 SƠ ĐỒ LUỒNG CHẠY PRODUCT MODEL

## 🔄 **LUỒNG CHẠY TỔNG QUAN**

```
📱 CLIENT REQUEST
    ↓
🌐 EXPRESS SERVER
    ↓
🎯 CONTROLLER
    ↓
🏭 PRODUCT MODEL
    ↓
📊 MONGODB DATABASE
    ↓
📱 CLIENT RESPONSE
```

---

## 📋 **CHI TIẾT TỪNG BƯỚC**

### **🔄 BƯỚC 1: IMPORT MODEL**
```
📁 File: src/controller/productController.js
    ↓
import Product from "../models/Product.js"
    ↓
📁 File: src/models/Product.js
    ↓
🏗️ Tạo Schema + Model
    ↓
📤 Export Model
```

### **🔄 BƯỚC 2: TẠO SẢN PHẨM MỚI**
```
📱 POST /api/products
    ↓
🎯 productController.addProduct()
    ↓
📦 new Product({ name, price, ... })
    ↓
✅ Mongoose Validation
    ↓
💾 product.save()
    ↓
📊 MongoDB Insert
    ↓
📱 Response: Created Product
```

### **🔄 BƯỚC 3: LẤY DANH SÁCH SẢN PHẨM**
```
📱 GET /api/products
    ↓
🎯 productController.getProducts()
    ↓
🔍 Product.find({})
    ↓
📊 MongoDB Query
    ↓
📋 Return Array of Products
    ↓
📱 Response: JSON Array
```

### **🔄 BƯỚC 4: TÌM KIẾM SẢN PHẨM**
```
📱 GET /api/products?search=iphone
    ↓
🎯 productController.getProducts()
    ↓
🔍 Product.find({ name: /iphone/i })
    ↓
📊 MongoDB Regex Query
    ↓
📋 Filtered Results
    ↓
📱 Response: Matching Products
```

---

## 🏗️ **CẤU TRÚC SCHEMA TRONG MONGODB**

```
📊 Collection: products
├── 📄 Document 1:
│   ├── _id: ObjectId("...")
│   ├── name: "iPhone 15 Pro"
│   ├── description: "Điện thoại cao cấp"
│   ├── price: 29990000
│   ├── category: "Điện thoại"
│   ├── stock: 50
│   ├── isActive: true
│   ├── images: ["url1", "url2"]
│   ├── tags: ["apple", "smartphone"]
│   ├── createdAt: 2024-01-15T10:30:00Z
│   └── updatedAt: 2024-01-15T10:30:00Z
│
├── 📄 Document 2:
│   ├── _id: ObjectId("...")
│   ├── name: "Samsung Galaxy S24"
│   ├── description: "Android flagship"
│   ├── price: 24990000
│   ├── category: "Điện thoại"
│   ├── stock: 30
│   ├── isActive: true
│   ├── images: ["url3", "url4"]
│   ├── tags: ["samsung", "android"]
│   ├── createdAt: 2024-01-15T11:00:00Z
│   └── updatedAt: 2024-01-15T11:00:00Z
│
└── 📄 Document 3: ...
```

---

## 🔧 **VALIDATION FLOW**

```
📦 new Product(data)
    ↓
🔍 Schema Validation
    ├── ✅ name: String, required, trim
    ├── ✅ description: String, required
    ├── ✅ price: Number, required, min: 0
    ├── ✅ category: String, required, trim
    ├── ✅ stock: Number, default: 0, min: 0
    ├── ✅ isActive: Boolean, default: true
    ├── ✅ images: [String]
    └── ✅ tags: [String, trim]
    ↓
✅ All Valid → Create Instance
❌ Invalid → Throw ValidationError
```

---

## 💾 **DATABASE OPERATIONS FLOW**

### **CREATE (Insert)**
```
📦 product.save()
    ↓
🔗 MongoDB Connection
    ↓
📊 db.products.insertOne({
    name: "iPhone",
    price: 1000000,
    createdAt: new Date(),
    updatedAt: new Date()
})
    ↓
✅ Success → Return saved document
❌ Error → Throw error
```

### **READ (Find)**
```
🔍 Product.find({ category: "Điện thoại" })
    ↓
🔗 MongoDB Connection
    ↓
📊 db.products.find({ category: "Điện thoại" })
    ↓
📋 Return cursor/array
    ↓
📱 Convert to JSON response
```

### **UPDATE (Modify)**
```
📦 product.stock = 100
    ↓
💾 product.save()
    ↓
🔗 MongoDB Connection
    ↓
📊 db.products.updateOne(
    { _id: ObjectId("...") },
    { 
        $set: { 
            stock: 100,
            updatedAt: new Date()
        }
    }
)
    ↓
✅ Success → Return updated document
```

### **DELETE (Remove)**
```
🗑️ Product.findByIdAndDelete(id)
    ↓
🔗 MongoDB Connection
    ↓
📊 db.products.deleteOne({ _id: ObjectId("...") })
    ↓
✅ Success → Return deleted document
```

---

## 🎯 **ERROR HANDLING FLOW**

```
❌ Validation Error
    ↓
📝 Mongoose ValidationError
    ↓
🎯 Controller catch block
    ↓
📱 Response: 400 Bad Request
    └── { error: "Validation failed", details: [...] }

❌ Database Error
    ↓
📝 MongoDB Error
    ↓
🎯 Controller catch block
    ↓
📱 Response: 500 Internal Server Error
    └── { error: "Database connection failed" }

❌ Not Found Error
    ↓
📝 Product not found
    ↓
🎯 Controller check
    ↓
📱 Response: 404 Not Found
    └── { error: "Product not found" }
```

---

## 🚀 **PERFORMANCE OPTIMIZATION**

### **Indexing Strategy**
```
📊 MongoDB Indexes:
├── 🔍 { name: 1 } - Text search
├── 🔍 { category: 1 } - Category filter
├── 🔍 { price: 1 } - Price range
├── 🔍 { isActive: 1 } - Active products
└── 🔍 { createdAt: -1 } - Sort by date
```

### **Query Optimization**
```
🔍 Efficient Queries:
├── Product.find({ isActive: true }) - Use index
├── Product.find({ category: "Điện thoại" }) - Use index
├── Product.find().limit(10) - Pagination
└── Product.find().select("name price") - Field selection
```

---

## ✅ **TÓM TẮT LUỒNG CHẠY**

1. **📱 Client Request** → Express Server
2. **🌐 Express** → Route to Controller
3. **🎯 Controller** → Use Product Model
4. **🏭 Model** → Validate & Transform Data
5. **📊 MongoDB** → Execute Database Operation
6. **📱 Response** → Return JSON to Client

**Luồng chạy đảm bảo dữ liệu được validate, lưu trữ an toàn và truy vấn hiệu quả!** 🎉
