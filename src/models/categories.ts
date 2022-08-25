import { ContentDTO, Category, CategoryDTO } from '../common/types';
import { deleteBuilder, insertBuilder, updateBuilder } from './queryBuilder';
import prisma from '../prisma';
const getCategoryByName = async (userId: number, categoryName: string) => {
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

const getCategoryById = async (categoryId: number) => {
  const query = `
  SELECT 
    categories.id,
    categories.user_id,
    categories.category_name,
    categories.timelogs,
    colors.color_name,
    colors.hex
  FROM categories
  JOIN colors on categories.color_id=colors.id 
  WHERE 
  categories.id='${categoryId}';
`;
  const category: Array<Category> = await prisma.$queryRawUnsafe(query);
  return category[0];
};

const getCategories = async (userId: number) => {
  const query = `
  SELECT 
    categories.id,
    categories.category_name,
    categories.timelogs,
    colors.color_name,
    colors.hex
  FROM categories
  JOIN colors on categories.color_id=colors.id 
  WHERE 
  user_id='${userId}';
`;
  const category: Array<Category> = await prisma.$queryRawUnsafe(query);
  return category;
};

const createCategoryFromContent = async (
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

const createCategory = async (userId: number, categoryDTO: CategoryDTO) => {
  const query = `
  INSERT INTO categories (
    category_name,
    timelogs,
    color_id,
    user_id
  ) VALUES (
    "${categoryDTO.category_name}",
    ${categoryDTO.timelogs},
    (SELECT id FROM colors WHERE hex = "${categoryDTO.color_hex}"),
    ${userId}
  ); 
`;
  await prisma.$queryRawUnsafe(query);
  return;
};

const updateCategory = async (userId: number, categoryInfo: Category) => {
  //const query = updateBuilder(id as number, categoryInfo, 'categories');
  const query = `
    UPDATE categories 
    SET 
      category_name = "${categoryInfo.category_name}",
      timelogs = ${categoryInfo.timelogs}, 
      color_id = (SELECT id FROM colors WHERE hex = "${categoryInfo.color_hex}")
      WHERE id = ${categoryInfo.id};
  `;
  await prisma.$queryRawUnsafe(query);
};

const deleteCategory = async (userId: number, categoryId: number) => {
  const data = { id: categoryId };
  const query = deleteBuilder(data, 'category', '');
  await prisma.$queryRawUnsafe(query);
};

export default {
  getCategoryByName,
  getCategoryById,
  getCategories,
  createCategoryFromContent,
  createCategory,
  updateCategory,
  deleteCategory,
};
