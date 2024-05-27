import express from 'express';
import { loginUser, logoutUser, signUpUser } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/login', loginUser);

router.post('/signup', signUpUser);

router.post('/logout', logoutUser);

export default router;