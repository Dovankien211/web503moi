import { Router } from "express";

const productRouter = Router();

// Dữ liệu giả: danh sách sản phẩm
let products = [
  { id: 1, name: "Sản phẩm 1", price: 100000 },
  { id: 2, name: "Sản phẩm 2", price: 250000 },
];

// GET /api/products - Lấy danh sách sản phẩm
productRouter.get("/", (req, res) => {
  return res.json(products);
});

// GET /api/products/:id - Lấy chi tiết sản phẩm
productRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  return res.json(product);
});

// POST /api/products - Thêm sản phẩm mới
productRouter.post("/", (req, res) => {
  const { name, price } = req.body || {};
  if (!name || typeof price !== "number") {
    return res
      .status(400)
      .json({ error: "Name is required and price must be a number" });
  }
  // Tạo id tự tăng: lấy max id hiện có + 1 (để dễ dự đoán, ví dụ sẽ là 3)
  const nextId = (products.length > 0)
    ? Math.max(...products.map((p) => p.id)) + 1
    : 1;
  const newProduct = { id: nextId, name, price };
  products.push(newProduct);
  return res.status(201).json(newProduct);
});

// PUT /api/products/:id - Cập nhật sản phẩm
productRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const { name, price } = req.body || {};
  product.name = name ?? product.name;
  product.price = typeof price === "number" ? price : product.price;

  return res.json(product);
});

// DELETE /api/products/:id - Xóa sản phẩm
productRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products.splice(index, 1);
  return res.json({ success: true });
});

export default productRouter;
