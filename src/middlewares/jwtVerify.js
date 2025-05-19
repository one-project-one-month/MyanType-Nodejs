// middleware/verifyToken.js
import { jwtVerify, importJWK } from 'jose';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

let JWKS_CACHE = null;

const getJWKS = async () => {
  if (JWKS_CACHE) return JWKS_CACHE;

  const res = await fetch(process.env.SUPABASE_JWKS_URL);
  const data = await res.json();
  JWKS_CACHE = data.keys;
  return JWKS_CACHE;
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const jwks = await getJWKS();
    const jwk = jwks[0]; // typically only one key is present
    const key = await importJWK(jwk, jwk.alg);
    const { payload } = await jwtVerify(token, key);

    req.user = payload; // Supabase user info (sub, email, etc.)
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token', error: err.message });
  }
};

export default verifyToken; 