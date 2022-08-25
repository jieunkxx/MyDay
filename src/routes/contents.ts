import { Router } from 'express';
import { PathRouter } from '../common/class';
import asyncWrap from '../async-wrap';
import { contentsController } from '../controller';
import verifyToken from '../middleware/auth';

class ContentsRouter extends PathRouter {
  constructor() {
    const path = '/contents';
    const router = Router();
    super(path, router);
    router.use(verifyToken);
    router.get(
      '/byCategory',
      verifyToken,
      asyncWrap(contentsController.getContentsByCategory)
    );
    router.get(
      '/byCategoryId/:id',
      verifyToken,
      asyncWrap(contentsController.getContentsByCategoryId)
    );
    router.post('/', verifyToken, asyncWrap(contentsController.getContents));
    router.post(
      '/create',
      verifyToken,
      asyncWrap(contentsController.createContents)
    );
    router.patch(
      '/',
      verifyToken,
      asyncWrap(contentsController.updateContents)
    );
    router.delete(
      '/',
      verifyToken,
      asyncWrap(contentsController.deleteContents)
    );
  }
}
export default ContentsRouter;
