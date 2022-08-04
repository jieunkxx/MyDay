import { PrismaClient } from '@prisma/client';
import { User, ContentInfo, Category } from '../common/types';

const prisma = new PrismaClient();

export const readCategoryId = async (user: User, contentInfo: ContentInfo) => {
  const category: Array<Category> = await prisma.$queryRaw`
    SELECT * FROM categories WHERE user_id = ${user.id} AND category_id=${contentInfo.category_name};
  `;
  return category[0];
};

export const getContents = async (userId: number) => {
  const result = await prisma.$queryRaw`
  SELECT 
    contents.id as contentId,
    title,
    memo,
    categories.id as categoryId,
    category_name as categoryName,
    start_time, end_time,
    budgets.budget,
    colors.rgb as categoryColor
  FROM contents
  JOIN categories ON contents.category_id=categories.id
  JOIN budgets ON contents.budget_id = budgets.id
  JOIN colors ON categories.color_id=colors.id;
  `;
  return result;
};

export const addContents = async () => {};
export const updateContents = async () => {};
export const deleteContents = async () => {};
