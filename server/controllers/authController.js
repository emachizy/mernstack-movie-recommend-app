import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id);

  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",

      sameSite: "Lax", // or "None" if using cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      user: { id: user._id, name: user.name, email },
      message: "Login successful",
    });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "Email already in use" });

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);

  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      user: { id: user._id, name, email },
      message: "Registration successful",
    });
};

export const logout = (req, res) => {
  res
    .cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({ message: "Logged out" });
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};
