import { Router } from 'express';
import asyncWrap from '../async-wrap';
import { contentsController } from '../controller';
import verifyToken from '../middleware/auth';
const router = Router();

router.use(verifyToken);
router.get('/', verifyToken, asyncWrap(contentsController.getContents));
router.post('/', verifyToken, asyncWrap(contentsController.createContents));
router.patch('/', verifyToken, asyncWrap(contentsController.updateContents));
router.delete('/', verifyToken, asyncWrap(contentsController.deleteContents));
export default router;
