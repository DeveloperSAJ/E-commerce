import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Auth middleware to verify JWT and attach user to req.user
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer Token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token and get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Retrieve user by ID excluding password, attach to req.user
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('User not found, not authorized');
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware to check user roles for authorization
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized, no user found');
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error('Forbidden: insufficient permissions');
    }
    next();
  };
};