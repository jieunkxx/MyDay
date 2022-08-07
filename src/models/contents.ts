import { PrismaClient } from '@prisma/client';
import { User, ContentInfo, Category } from '../common/types';
import { deleteBuilder, insertBuilder, updateBuilder } from './queryBuilder';
const prisma = new PrismaClient();

export const getContentById = async (id: number) => {
  const content: Array<ContentInfo> = await prisma.$queryRaw`
    SELECT * FROM contents WHERE id=${id}
  `;
  return content[0];
};

export const getContents = async (userId: number) => {
  const result = await prisma.$queryRaw`
    SELECT 
      categories.id as categoryId,
      categories.category_name,
      'color', colors.rgb,
      (JSON_ARRAYAGG(
        JSON_OBJECT(
          'content_id', contents.id,
          'content_title', contents.title,
          'memo', contents.memo,
          'start_time', contents.start_time,
          'end_time', contents.end_time
        )
       )
      ) as content        
    FROM (SELECT * FROM contents ORDER BY start_time) contents
    JOIN (SELECT * FROM categories ORDER BY category_name DESC) categories ON categories.id=category_id
    JOIN colors ON colors.id=categories.color_id
    WHERE categories.user_id=${userId}
    GROUP BY categoryId
    ORDER BY category_name ASC
  `;
  return result;
};

export const createContents = async (
  contentInfo: ContentInfo,
  categoryId: number
) => {
  const data = { ...contentInfo, categoryId };
  delete data.category_name;
  const query = insertBuilder(data as ContentInfo, 'contents');
  await prisma.$queryRawUnsafe(query);
};

export const updateContents = async (
  userId: number,
  contentInfo: ContentInfo
) => {
  const query = updateBuilder(
    contentInfo.id as number,
    contentInfo,
    'contents'
  );
  await prisma.$queryRawUnsafe(query);
};

export const deleteContents = async (userId: number, contentId: number) => {
  const data = { id: contentId };
  const query = deleteBuilder(data, 'contents', '');
  await prisma.$queryRawUnsafe(query);
};
