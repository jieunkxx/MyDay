import { Request, Response } from 'express';
import { User, BudgetDTO } from '../common/types';
import { budgetModel } from '../models';

export const getBudget = async (req: Request, res: Response) => {};
export const createBudget = async (userId: number, budgetInfo: BudgetDTO) => {
  await budgetModel.createBudget(userId, budgetInfo);
};

export const updateBudget = async (req: Request, res: Response) => {};
export const deleteBudget = async (req: Request, res: Response) => {};
