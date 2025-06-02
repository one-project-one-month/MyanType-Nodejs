import jwt from "jsonwebtoken";

const verifyOrRefreshToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  // Try verifying access token first
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      console.log("accesstoken in userprofile " + accessToken);
      console.log("decoded id in userprofile" + decoded.id);

      req.user = decoded;
      return next(); // Access token is valid
    } catch (error) {
      // Access token may be expired — continue to try refreshing
    }
  }

  // If access token is missing or invalid, try refresh token
  const refreshToken = req.cookies.refreshToken;
  console.log("refreshtoken in userprofile " + refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    // Set new access token in cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
      path: "/",
    });

    req.user = decoded; // attach user info from refresh token
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

export default verifyOrRefreshToken;
