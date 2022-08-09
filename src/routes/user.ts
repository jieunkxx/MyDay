import { Router } from 'express';
import asyncWrap from '../async-wrap';
import { userController } from '../controller';
const router = Router();
router.post('/signup', asyncWrap(userController.signup));
router.post('/login', asyncWrap(userController.login));
export default router;
