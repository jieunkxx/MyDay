import { Router } from 'express';
import { PathRouter } from '../common/class';
import asyncWrap from '../async-wrap';
import { budgetController } from '../controller';
import verifyToken from '../middleware/auth';

class BudgetRouter extends PathRouter {
  constructor() {
    const path = '/budget';
    const router = Router();
    super(path, router);
    router.use(verifyToken);
    router.get('/', verifyToken, asyncWrap(budgetController.getBudget));
    router.post('/', verifyToken, asyncWrap(budgetController.createBudget));
    router.patch('/', verifyToken, asyncWrap(budgetController.updateBudget));
    router.delete('/', verifyToken, asyncWrap(budgetController.deleteBudget));
  }
}

export default BudgetRouter;
