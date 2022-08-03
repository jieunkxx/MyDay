import { Router } from 'express';
import asyncWrap from '../async-wrap';
import * as userController from '../controller/user';
const router = Router();

router.post('/signup', asyncWrap(userController.signup));
router.post('/login', asyncWrap(userController.login));
export default router;
