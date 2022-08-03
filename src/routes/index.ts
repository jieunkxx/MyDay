import express from 'express';
import userRouter from './user';
import contentsRouter from './contents';
import budgetRouter from './budget';
import friendsRouter from './friends';

const router = express.Router();

router.use('/user', userRouter);
router.use('/content', contentsRouter);
router.use('/budget', budgetRouter);
router.use('/friends', friendsRouter);
export default router;
