import {
  User,
  ContentDTO,
  CustomError,
  Category,
  CategoryDTO,
} from '../common/types';
import * as categoryModel from '../models/categories';

const doesExist = (obj: any) => {
  return Object.keys(obj).length !== 0;
};

export const getCategories = async (userId: number) => {
  const result = await categoryModel.getCategories(userId);
  return result;
};

export const createCategory = async (
  userId: number,
  categoryInfo: CategoryDTO
) => {};

export const updateCategory = async (
  userId: number,
  categoryInfo: Category
) => {
  const target = await categoryModel.getCategoryById(categoryInfo.id as number);
  if (doesExist(target)) {
    await categoryModel.updateCategory(userId, categoryInfo);
  } else {
    const msg = 'UPDATE_CATEGORY_FAILED: CATEGORY_NOT_EXIST';
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};

export const deleteCategory = async (userId: number, categoryId: number) => {
  const target = await categoryModel.getCategoryById(categoryId);
  if (doesExist(target)) {
    await categoryModel.deleteCategory(userId, categoryId);
  } else {
    const msg = 'DELETE_CATEGORY_FAILED: CATEGORY_NOT_EXIST';
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};
