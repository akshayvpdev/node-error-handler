const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const customError = require("../utils/customError");







exports.register = asyncHandler(async (req, res, next) => {
  const { fullname, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new customError("Passwords do not match", 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new customError("User already exists", 400));
  }
  const user = await new User({ fullname, email, password }).save();
  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(201).json({
    message: "Registration successful",
    user: { fullname, email },
    token,
  });
});







exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ email: username });
  if (!user) {
    return next({ statusCode: 401, message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next({ statusCode: 401, message: "Invalid password" });
  }
  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ message: "Login successful", token });
});
