import { Request, Response } from 'express';
import { User, ContentDTO, Category, CategoryDTO } from '../common/types';
import * as categoryService from '../services/categories';

export const getCategories = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const categories = await categoryService.getCategories(user.id as number);
  res.status(200).json({ categories });
};

export const createCategory = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const categoryDTO: CategoryDTO = req.body;
  await categoryService.createCategory(user.id as number, categoryDTO);
  res.status(201).json({ message: 'content created' });
};

export const updateCategory = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const categoryInfo: Category = req.body;
  await categoryService.updateCategory(user.id as number, categoryInfo);
  res.status(201).json({ message: 'content updated' });
};
export const deleteCategory = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const searchParams = new URLSearchParams(<any>req.query);
  const contentId = searchParams.get('contentId');
  await categoryService.deleteCategory(user.id as number, Number(contentId));
  res.status(201).json({ message: 'content deleted' });
};
