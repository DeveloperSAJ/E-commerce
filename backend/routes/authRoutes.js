import express from 'express';
import { registerUser, loginUser, googleAuth } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// POST /api/auth/google
router.post('/google', googleAuth);

export default router;

