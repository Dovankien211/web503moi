import { Router } from "express";
import { signup, login, getMe } from "../controllers/auth.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { signupSchema, signinSchema } from "../validation/auth.validation.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Route test đơn giản
router.get("/test", (req, res) => {
  res.json({ message: "Auth router working!" });
});

// Route đăng ký
router.post("/signup", validateRequest(signupSchema), signup);

// Route đăng nhập
router.post("/login", validateRequest(signinSchema), login);

// Route lấy thông tin người dùng hiện tại
router.get("/me", verifyJWT, getMe);

export default router;


