import { fa } from "@faker-js/faker";
import authService from "./auth.service.js";
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser(username, email, password);
    res.status(201).json({ success: true, message: "User Registered", user });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false, message: "error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(
      email,
      password
    );
    if (user) {
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login Successfully!",
        user,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ success: false, message: "Login error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const authController = {
  register,
  login,
  logout,
};
export default authController;
