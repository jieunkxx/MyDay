import { PrismaClient } from '@prisma/client';
import { User, ContentInfo, Category } from '../common/types';

const prisma = new PrismaClient();

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
    WHERE categories.user_id=1
    GROUP BY categoryId
    ORDER BY category_name ASC
  `;
  return result;
};

export const createContents = async (
  contentInfo: ContentInfo,
  categoryId: number
) => {
  const query = `
  INSERT INTO contents (
    title,
    memo,
    category_id,
    start_time,
    end_time
    ) VALUES (
    '${contentInfo.title}',
    '${contentInfo.memo}',
    ${categoryId},
    '${contentInfo.start_time}',
    '${contentInfo.end_time}'
    );
  `;
  await prisma.$queryRawUnsafe(query);
};

export const updateContents = async () => {};
export const deleteContents = async () => {};
