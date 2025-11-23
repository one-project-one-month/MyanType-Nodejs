export function getCookieOptions(req, extras = {}) {
  const isProd = process.env.NODE_ENV === "production";

  // Safely detect secure connection; `req` can be undefined in some contexts.
  const forwardedProtoRaw = req && req.headers && req.headers["x-forwarded-proto"];
  const forwardedProto = typeof forwardedProtoRaw === "string" ? forwardedProtoRaw.toLowerCase() : forwardedProtoRaw;

  const isSecureRequest = Boolean(
    isProd || (req && (req.secure || forwardedProto === "https"))
  );

  const options = {
    httpOnly: true,
    secure: isSecureRequest,
    // Browsers require `SameSite=None` for cross-site cookies when `secure=true`.
    sameSite: isSecureRequest ? "none" : "lax",
    path: "/",
    ...extras,
  };

  // Optionally set domain from env var to support cookies on a custom domain.
  if (process.env.COOKIE_DOMAIN) {
    options.domain = process.env.COOKIE_DOMAIN;
  }

  return options;
}
