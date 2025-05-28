import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
  } catch (error) {
    req.user = null; // token invalid or expired, treat as guest

    return next();
  }

  next();
};

export default optionalAuth;
