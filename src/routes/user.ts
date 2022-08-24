import { Router } from 'express';
import { PathRouter } from '../common/class';
import asyncWrap from '../async-wrap';
import { userController } from '../controller';
import verifyToken from '../middleware/auth';
class UserRouter extends PathRouter {
  constructor() {
    const path = '/user';
    const router = Router();
    super(path, router);
    router.post('/signup', asyncWrap(userController.signup));
    router.post('/login', asyncWrap(userController.login));
    router.get('/kakao/login', asyncWrap(userController.kakaoLogin)); //redirect_uri
    router.use(verifyToken);
    router.get('/', verifyToken, asyncWrap(userController.getUserInfo));
  }
}
export default UserRouter;
