import { User, ContentDTO, Category, CustomError } from '../common/types';
import { contentsModel, categoriesModel } from '../models';
const doesExist = (obj: any) => {
  return Object.keys(obj).length !== 0;
};

export const getContents = async (userId: number, date: string) => {
  const result = await contentsModel.getContents(userId, date);
  return result;
};

export const getContentsByCategory = async (userId: number) => {
  const result = await contentsModel.getContentsByCategory(userId);
  return result;
};

export const getContentsByCategoryId = async (
  userId: number,
  categoryId: number
) => {
  const result = await contentsModel.getContentsByCategoryId(
    userId,
    categoryId
  );
  return result;
};

export const createContents = async (
  userId: number,
  contentInfo: ContentDTO
) => {
  if (contentInfo.createCategory) {
    await categoriesModel.createCategoryFromContent(userId, contentInfo);
  }
  const category: Category = await categoriesModel.getCategoryByName(
    userId,
    contentInfo.category_name as string
  );
  const categoryId = category.id;
  await contentsModel.createContents(contentInfo, categoryId as number);
};

export const updateContents = async (
  userId: number,
  contentInfo: ContentDTO
) => {
  const target = await contentsModel.getContentById(contentInfo.id as number);
  if (doesExist(target)) {
    await contentsModel.updateContents(userId, contentInfo);
  } else {
    const msg = 'UPDATE_CONTENTS_FAILED: CONTENT_NOT_EXIST';
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};

export const deleteContents = async (userId: number, contentId: number) => {
  const target = await contentsModel.getContentById(contentId);
  if (doesExist(target)) {
    await contentsModel.deleteContents(userId, contentId);
  } else {
    const msg = 'DELETE_CONTENTS_FAILED: CONTENT_NOT_EXIST';
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};
