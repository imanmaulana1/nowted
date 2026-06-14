import crypto from 'crypto';
import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

import { getEnv } from '#/config/env.js';

export const signAccessToken = async (
  payload: JWTPayload,
  expiresIn: string = '15m'
) => {
  const secret = new TextEncoder().encode(getEnv.ACCESS_TOKEN_SECRET);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(getEnv.JWT_ISSUER)
    .setAudience(getEnv.JWT_AUDIENCE)
    .setExpirationTime(expiresIn)
    .sign(secret);
};

export const verifyAccessToken = async (token: string) => {
  const secret = new TextEncoder().encode(getEnv.ACCESS_TOKEN_SECRET);

  const { payload } = await jwtVerify(token, secret, {
    issuer: getEnv.JWT_ISSUER,
    audience: getEnv.JWT_AUDIENCE,
  });

  return payload;
};

export const hashRefreshToken = (token: string) => {
  return crypto
    .createHmac('sha256', getEnv.REFRESH_TOKEN_SECRET)
    .update(token)
    .digest('hex');
};

export const generateRefreshToken = () => {
  const plain = crypto.randomBytes(64).toString('hex');
  const hash = hashRefreshToken(plain);

  return {
    plain,
    hash,
  };
};
