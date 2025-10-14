import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// Đăng ký tài khoản
export const signup = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    // Kiểm tra email đã tồn tại
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email đã được sử dụng" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu người dùng vào cơ sở dữ liệu
    const user = await User.create({ name, email, password: hashedPassword, phone, role });

    // Trả về user đã ẩn mật khẩu
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      createdAt: user.createdAt,
    };

    res.status(201).json({ message: "User registered successfully", data: safeUser });
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

    // Tạo JWT (chứa id để middleware kiểm tra)
    const token = jwt.sign({ id: user._id, role: user.role }, "yourSecretKey", { expiresIn: "1h" });

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({ token, user: safeUser });
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


