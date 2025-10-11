import { Router } from "express";
import { signup, login, getMe } from "../controllers/auth.js";

const router = Router();

// Route test đơn giản
router.get("/test", (req, res) => {
  res.json({ message: "Auth router working!" });
});

// Route đăng ký (tạm thời bỏ middleware để test)
router.post("/signup", signup);

// Route đăng nhập
router.post("/login", login);

// Route lấy thông tin người dùng hiện tại
router.get("/me", getMe);

export default router;


