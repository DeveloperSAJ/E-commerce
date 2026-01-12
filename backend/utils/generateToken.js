const generateToken = (userId, expiresIn = '30d') => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

export default generateToken;