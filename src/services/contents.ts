import { User, ContentInfo, CustomError } from '../common/types';
import * as contentsModel from '../models/contents';
import * as categoryModel from '../models/categories';

const doesCategoryExist = async (userId: number, contentInfo: ContentInfo) => {
  const category = await categoryModel.readCategory(userId, contentInfo);
  return category;
};

const doesExist = (obj: any) => {
  return Object.keys(obj).length !== 0;
};

export const getContents = async (userId: number) => {
  const result = await contentsModel.getContents(userId);
  return result;
};

export const createContents = async (
  userId: number,
  contentInfo: ContentInfo
) => {
  if (contentInfo.createCategory) {
    await categoryModel.createCategory(userId, contentInfo);
  }
  const category = await categoryModel.readCategory(userId, contentInfo);
  const categoryId = category.id;
  await contentsModel.createContents(contentInfo, categoryId);
};

export const updateContents = async (
  userId: number,
  contentInfo: ContentInfo
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
    const msg = 'UPDATE_CONTENTS_FAILED: CONTENT_NOT_EXIST';
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};
