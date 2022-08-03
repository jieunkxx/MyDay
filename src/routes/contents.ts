import { Router } from 'express';
import asyncWrap from '../async-wrap';
import * as contentsController from '../controller/contents';
const router = Router();

router.get('/', asyncWrap(contentsController.getContents));
router.post('/', asyncWrap(contentsController.createContents));
router.patch('/', asyncWrap(contentsController.updateContents));
router.delete('/', asyncWrap(contentsController.deleteContents));
export default router;
