import { Router } from 'express';
import { PathRouter } from '../common/class';
import asyncWrap from '../async-wrap';
import { friendsController } from '../controller';

class FriendsRouter extends PathRouter {
  constructor() {
    const path = '/friends';
    const router = Router();
    super(path, router);

    router.get('/', asyncWrap(friendsController.getFriends));
    router.put('/', asyncWrap(friendsController.addFriends));
    router.delete('/', asyncWrap(friendsController.deleteFriends));
  }
}
export default FriendsRouter;
