import { PrismaClient } from '@prisma/client';
import { User, ContentInfo, Category } from '../common/types';

const prisma = new PrismaClient();

export const readCategory = async (user: User, contentInfo: ContentInfo) => {
  const query = `
  SELECT * FROM categories 
  WHERE 
  user_id=${user.id}
  AND
  category_name='${contentInfo.category_name}';
`;
  const category: Array<Category> = await prisma.$queryRawUnsafe(query);
  return category[0];
};

export const createCategory = async (user: User, contentInfo: ContentInfo) => {
  const query = `
    INSERT INTO categories (
      category_name,
      color_id,
      user_id
    ) VALUES (
      ${contentInfo.category_name},
      '(SELECT id FROM colors WHERE color_name = ${contentInfo.color_name})',
      ${user.id}
    ); 
  `;
  await prisma.$queryRawUnsafe(query);
  return;
};
