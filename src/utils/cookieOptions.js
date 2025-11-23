export function getCookieOptions(req, extras = {}) {
  const isProd = process.env.NODE_ENV === "production";

  // Detect secure connection: express sets req.secure when behind TLS.
  const isSecureRequest = Boolean(
    isProd || req.secure || req.headers["x-forwarded-proto"] === "https"
  );

  const options = {
    httpOnly: true,
    secure: isSecureRequest,
    sameSite: isSecureRequest ? "none" : "lax",
    path: "/",
    ...extras,
  };

  return options;
}
