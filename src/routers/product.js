import { Router } from "express";
import {
  getAllProduct,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const productRouter = Router();

// GET /api/products - Lấy danh sách sản phẩm
productRouter.get("/", getAllProduct);

// GET /api/products/:id - Lấy chi tiết sản phẩm
productRouter.get("/:id", getById);

// POST /api/products - Thêm sản phẩm mới
productRouter.post("/", addProduct);

// PUT /api/products/:id - Cập nhật sản phẩm
productRouter.put("/:id", updateProduct);

// DELETE /api/products/:id - Xóa sản phẩm
productRouter.delete("/:id", deleteProduct);

export default productRouter;
