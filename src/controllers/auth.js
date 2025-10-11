import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// Đăng ký tài khoản
export const signup = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu người dùng vào cơ sở dữ liệu
    const user = await User.create({ name, email, password: hashedPassword, phone, role });

    res.status(201).json({ message: "User registered successfully", data: user });
  } catch (err) {
    res.status(400).json({ message: "Error registering user", error: err.message });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    // Tạo JWT
    const token = jwt.sign({ email: user.email, role: user.role }, "yourSecretKey", { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: "Error logging in", error: err.message });
  }
};

// Lấy thông tin người dùng hiện tại
export const getMe = async (req, res) => {
  try {
    // Lấy user từ middleware auth
    const user = req.user;

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ message: "Error fetching user info", error: err.message });
  }
};


