import express from 'express';
import {
  getAllUsersHandler,
  getMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middlewares/deserializeUser';
import { requireUser } from '../middlewares/requireUsr';
import { restrictTo } from '../middlewares/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler);

// Get my info route
router.get('/me', getMeHandler);

export default router;

