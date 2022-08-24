import prisma from '../prisma';
import { User, Budget, BudgetDTO } from '../common/types';

const checkExist = async (
  userId: number,
  yearWeek: string,
  categoryId: number
) => {
  const [isNotEmpty]: any = await prisma.$queryRawUnsafe(`
    SELECT EXISTS (SELECT 1 FROM budgets where user_id=${userId} AND yearWeek=${yearWeek} AND category_id=${categoryId}) budgets}
  `);
  type budgets = number;
  return /^1/.test(isNotEmpty.budgets);
};

const getBudgetId = async (
  userId: number,
  yearWeek: string,
  categoryId: number
) => {
  const id: Array<number> = await prisma.$queryRaw`
    SELECT 1 FROM budgets where user_id=${userId} AND yearWeek=${yearWeek} AND category_id=${categoryId}
  `;
  return id[0];
};

const getBudgetsOfYearWeek = async (userId: number, yearWeek: string) => {
  const budgets: Array<Budget> = await prisma.$queryRaw`
    SELECT * FROM budgets where user_id=${userId} AND yearWeek=${yearWeek}
  `;
  return budgets;
};
const createBudget = async (userId: number, budgetInfo: BudgetDTO) => {
  const budgetId = await getBudgetId(
    userId,
    budgetInfo.yearWeek,
    budgetInfo.category_id
  );
  let data = { ...{ user_id: userId }, ...budgetInfo };
  if (budgetId) {
    data = { ...{ budget_id: budgetId }, ...data };
  } else {
  }
};
const updateBudget = async () => {};
const deleteBudget = async () => {};

//UPDATE `myday`.`categories` SET `budget_id` = '1' WHERE (`id` = '2');

export default {
  checkExist,
  getBudgetId,
  getBudgetsOfYearWeek,
  createBudget,
  updateBudget,
  deleteBudget,
};
