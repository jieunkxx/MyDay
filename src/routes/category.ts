import { Router } from 'express';
import { PathRouter } from '../common/class';
import asyncWrap from '../async-wrap';
import { categoriesController } from '../controller';
import verifyToken from '../middleware/auth';

class CategoryRouter extends PathRouter {
  constructor() {
    const path = '/category';
    const router = Router();
    super(path, router);

    router.use(verifyToken);
    router.get('/', verifyToken, asyncWrap(categoriesController.getCategories));
    router.post(
      '/',
      verifyToken,
      asyncWrap(categoriesController.createCategory)
    );
    router.patch(
      '/',
      verifyToken,
      asyncWrap(categoriesController.updateCategory)
    );
    router.delete(
      '/',
      verifyToken,
      asyncWrap(categoriesController.deleteCategory)
    );
  }
}
export default CategoryRouter;
