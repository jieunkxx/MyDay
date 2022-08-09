import { Router } from 'express';
import asyncWrap from '../async-wrap';
import { budgetController } from '../controller';
import verifyToken from '../middleware/auth';
const router = Router();

router.use(verifyToken);
router.get('/', verifyToken, asyncWrap(budgetController.getBudget));
router.post('/', verifyToken, asyncWrap(budgetController.createBudget));
router.patch('/', verifyToken, asyncWrap(budgetController.updateBudget));
router.delete('/', verifyToken, asyncWrap(budgetController.deleteBudget));
export default router;
