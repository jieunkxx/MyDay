import express from 'express';
import userRouter from './user';
import categoryRouter from './category';
import contentRouter from './contents';
import budgetRouter from './budget';
import friendsRouter from './friends';

const router = express.Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/content', contentRouter);
router.use('/budget', budgetRouter);
router.use('/friends', friendsRouter);
export default router;
