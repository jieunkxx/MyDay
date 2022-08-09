import { Router } from 'express';
import asyncWrap from '../async-wrap';
import { categoriesController } from '../controller';
import verifyToken from '../middleware/auth';
const router = Router();

router.use(verifyToken);
router.get('/', verifyToken, asyncWrap(categoriesController.getCategories));
router.post('/', verifyToken, asyncWrap(categoriesController.createCategory));
router.patch('/', verifyToken, asyncWrap(categoriesController.updateCategory));
router.delete('/', verifyToken, asyncWrap(categoriesController.deleteCategory));
export default router;
