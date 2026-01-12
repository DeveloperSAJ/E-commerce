import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  registerUser,
  authUser,
} from '../controllers/userController.js';
import  { protect }  from '../middlewares/authMiddleware.js';
import  { admin }  from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', authUser);

// Private user routes (user profile)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes (user management)
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

export default router;