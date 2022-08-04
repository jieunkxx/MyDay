import { Router } from 'express';
import asyncWrap from '../async-wrap';
import * as budgetController from '../controller/budget';
const router = Router();

router.get('/', asyncWrap(budgetController.getBudget));
router.post('/', asyncWrap(budgetController.createBudget));
router.patch('/', asyncWrap(budgetController.updateBudget));
router.delete('/', asyncWrap(budgetController.deleteBudget));
export default router;
