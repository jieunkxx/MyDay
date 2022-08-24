import moment from 'moment';
import { ContentDTO } from '../common/types';
import { deleteBuilder, insertBuilder, updateBuilder } from './queryBuilder';
import prisma from '../prisma';
const getContentById = async (id: number) => {
  const content: Array<ContentDTO> = await prisma.$queryRaw`
    SELECT * FROM contents WHERE id=${id}
  `;
  return content[0];
};

const getContents = async (userId: number, date: string) => {
  const query = `
    SELECT 
      contents.id,
      contents.title,
      contents.memo,
      contents.start_time,
      contents.end_time,
      colors.hex
    FROM contents 
    JOIN categories ON categories.id = category_id
    JOIN users ON users.id=categories.user_id
    JOIN colors ON colors.id=categories.color_id
    WHERE user_id=${userId} AND Date(contents.start_time) = "${date}"
    ORDER BY contents.start_time;
  `;
  const result = await prisma.$queryRawUnsafe(query);
  return result;
};

const getContentsByCategory = async (userId: number) => {
  const result = await prisma.$queryRaw`
    SELECT 
      categories.id as categoryId,
      categories.category_name,
      'color', colors.hex,
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

const createContents = async (contentInfo: ContentDTO, categoryId: number) => {
  const data = { ...contentInfo, categoryId };
  delete data.category_name;
  const query = insertBuilder(data as ContentDTO, 'contents');
  await prisma.$queryRawUnsafe(query);
};

export const updateContents = async (
  userId: number,
  contentInfo: ContentDTO
) => {
  const query = updateBuilder(
    contentInfo.id as number,
    contentInfo,
    'contents'
  );
  await prisma.$queryRawUnsafe(query);
};

const deleteContents = async (userId: number, contentId: number) => {
  const data = { id: contentId };
  const query = deleteBuilder(data, 'contents', '');
  await prisma.$queryRawUnsafe(query);
};

export default {
  getContentById,
  getContents,
  getContentsByCategory,
  createContents,
  updateContents,
  deleteContents,
};
