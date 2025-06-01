import jwt from "jsonwebtoken";

const optionalAuthWithRefresh = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // Try access token first
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      // Access token invalid, try refresh token below
    }
  }

  // Try refresh token if access token failed
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // Generate new access token
      const newAccessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000,
      });
      console.log("req.user.id " + decoded.id);

      req.user = decoded;
      return next();
    } catch (error) {
      // Refresh token also invalid
    }
  }

  // No valid tokens, continue as guest
  next();
};

export default optionalAuthWithRefresh;
