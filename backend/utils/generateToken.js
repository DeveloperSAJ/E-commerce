import jwt from "jsonwebtoken";

const generateToken = (userId, isAdmin, expiresIn = '30d') => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign({ id: userId, isAdmin }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

export default generateToken;