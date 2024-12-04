/* eslint-disable @stylistic/multiline-comment-style */
import { User } from '@model/index';
import {
  jwtVerify, KeyLike, SignJWT, jwtDecrypt,
  JWTPayload
} from 'jose';
import { AuthException } from '../../api/express/middlewares/error';
import { getUser } from '../../data-access';
// import { v6 as uuidv6 } from 'uuid';

const KEY_SECRET: KeyLike = process.env.KEY_SECRET as unknown as KeyLike;
const JWT_HEADER = {
  alg: 'HS256',
  typ: 'JWT'
};
const JWT_PAYLOAD = {
  iss: 'https://auth.example.com',
  aud: 'https://api.example.com'
  // exp: 1700000000,
  // nbf: 1699990000,
  // iat: 1699980000
  // jti: uuidv6()
};

function createTokenJwt (user: User): Promise<string> {
  const jwt = new SignJWT();
  return jwt
    .setProtectedHeader(JWT_HEADER)
    .setIssuer(JWT_PAYLOAD.iss)
    .setSubject(user.userName)
    .setAudience(JWT_PAYLOAD.aud)
    .setExpirationTime('1h')
    .setNotBefore('1s')
    .setIssuedAt(Date.now())
    // .setJti(uuidv6())
    .sign(KEY_SECRET);
}

async function checkHeaderAuthJwt (authHeader: string): Promise<string> {
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer') throw new AuthException('The header is formed wrong');
  try {
    await jwtVerify(token, KEY_SECRET);
  } catch {
    throw new AuthException('The token is wrong');
  }
  return token;
}

async function getPaylaodAuthJwt (token: string): Promise<JWTPayload> {
  let payload: JWTPayload;
  try {
    const infoToken = await jwtDecrypt(token, KEY_SECRET);
    payload = { ...infoToken.payload };
  } catch {
    throw new AuthException('The token is not valid');
  }
  return payload;
}

async function checkSubAuthJwt (payload: JWTPayload): Promise<void> {
  const { sub } = payload;
  if (!sub) throw new AuthException('The token is not valid');
  try {
    await getUser().read(sub as string);
  } catch {
    throw new AuthException('The token is not valid');
  }
}

export {
  createTokenJwt,
  checkHeaderAuthJwt,
  getPaylaodAuthJwt,
  checkSubAuthJwt
};
