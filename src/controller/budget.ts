import { Request, Response } from 'express';
import moment from 'moment';
import { User, BudgetDTO } from '../common/types';
import * as budgetService from './../services/budget';

export const getBudget = async (req: Request, res: Response) => {};
export const createBudget = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const budgetInfo: BudgetDTO = req.body;
  const budget = await budgetService.createBudget(
    user.id as number,
    budgetInfo
  );
  res.status(200).json({ budget });
};
export const updateBudget = async (req: Request, res: Response) => {};
export const deleteBudget = async (req: Request, res: Response) => {};
