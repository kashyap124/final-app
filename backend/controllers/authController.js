const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create Admin if not exists
const initAdmin = async () => {
  const exists = await User.findOne({ username: "admin" });
  if (!exists) {
    const hashed = await bcrypt.hash("admin", 10);
    await User.create({ username: "admin", password: hashed, role: "admin" });
    console.log("👑 Default admin created");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Incorrect password" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, role: user.role });
};

const createStaff = async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: "Staff already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newStaff = await User.create({ username, password: hashed, role: "staff" });

  res.status(201).json({ message: "Staff created", staff: newStaff.username });
};

module.exports = { login, createStaff, initAdmin };
