import { User, ContentInfo, CustomError } from '../common/types';
import * as contentsModel from '../models/contents';
import * as categoryModel from '../models/categories';

const doesCategoryExist = async (user: User, contentInfo: ContentInfo) => {
  const category = await categoryModel.readCategory(user, contentInfo);
  return category;
};

const doesExist = (obj: any) => {
  return Object.keys(obj).length !== 0;
};

export const getContents = async (user: User) => {
  const result = await contentsModel.getContents(user);
  return result;
};

export const createContents = async (user: User, contentInfo: ContentInfo) => {
  if (contentInfo.createCategory) {
    await categoryModel.createCategory(user, contentInfo);
  }
  const category = await categoryModel.readCategory(user, contentInfo);
  const categoryId = category.id;
  await contentsModel.createContents(contentInfo, categoryId);
};

export const updateContents = async (user: User, contentInfo: ContentInfo) => {
  const target = await contentsModel.getContentById(contentInfo.id as number);
  if (doesExist(target)) {
    await contentsModel.updateContents(user, contentInfo);
  } else {
    const msg = 'UPDATE_CONTENTS_FAILED: CONTENT_NOT_EXIST';
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};

export const deleteContents = async (user: User, contentId: number) => {
  const target = await contentsModel.getContentById(contentId);
  if (doesExist(target)) {
    await contentsModel.deleteContents(user, contentId);
  } else {
    const msg = 'UPDATE_CONTENTS_FAILED: CONTENT_NOT_EXIST';
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};
