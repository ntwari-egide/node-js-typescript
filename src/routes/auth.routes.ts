
import express from 'express';
import { loginHandler, registerHandler } from '../controllers/authentication';
import { validate } from '../middlewares/validate';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler);

export default router;
