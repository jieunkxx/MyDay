import { PrismaClient } from '@prisma/client';
import { ContentDTO, Category } from '../common/types';
import { deleteBuilder, insertBuilder, updateBuilder } from './queryBuilder';

const prisma = new PrismaClient();

export const getCategoryByName = async (
  userId: number,
  categoryName: string
) => {
  const query = `
  SELECT * FROM categories 
  WHERE 
  user_id=${userId}
  AND
  category_name='${categoryName}';
`;
  const category: Array<Category> = await prisma.$queryRawUnsafe(query);
  return category[0];
};

export const getCategoryById = async (categoryId: number) => {
  const query = `
  SELECT * FROM categories 
  WHERE 
  id='${categoryId}';
`;
  const category: Array<Category> = await prisma.$queryRawUnsafe(query);
  return category[0];
};

export const getCategories = async (userId: number) => {
  const query = `
  SELECT * FROM categories 
  WHERE 
  user_id='${userId}';
`;
  const category: Array<Category> = await prisma.$queryRawUnsafe(query);
  return category[0];
};

export const createCategoryFromContent = async (
  userId: number,
  contentInfo: ContentDTO
) => {
  const query = `
    INSERT INTO categories (
      category_name,
      color_id,
      user_id
    ) VALUES (
      ${contentInfo.category_name},
      '(SELECT id FROM colors WHERE color_name = ${contentInfo.color_name})',
      ${userId}
    ); 
  `;
  await prisma.$queryRawUnsafe(query);
  return;
};

export const createCategory = async () => {};

export const updateCategory = async (
  userId: number,
  categoryInfo: Category
) => {
  const query = updateBuilder(
    categoryInfo.id as number,
    categoryInfo,
    'category'
  );
  await prisma.$queryRawUnsafe(query);
};

export const deleteCategory = async (userId: number, categoryId: number) => {
  const data = { id: categoryId };
  const query = deleteBuilder(data, 'category', '');
  await prisma.$queryRawUnsafe(query);
};
