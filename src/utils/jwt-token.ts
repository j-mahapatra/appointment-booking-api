import jwt from 'jsonwebtoken';

type JwtPayload = {
  userId: string;
};

export const generateJWTToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: '15d',
  });

  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
};
