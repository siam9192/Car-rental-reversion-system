import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TJwtPayload } from './auth.interface';
export const CreateAccessToken = (
  jwtPayload: TJwtPayload,
  secretToken: string,
  expireTime: string,
) => {
  const token = jwt.sign(jwtPayload, secretToken, { expiresIn: expireTime });
  return token;
};

export const MatchPassword = async (
  payloadPassword: string,
  hashedPassword: string,
) => {
  const result = await bcrypt.compare(payloadPassword, hashedPassword);
  return result;
};
