import {
  User,
  ContentDTO,
  CustomError,
  Category,
  CategoryDTO,
} from '../common/types';
import { categoriesModel } from '../models';
import errorGenerator from '../utils/errorGenerator';

const doesExist = (obj: any) => {
  return obj && Object.keys(obj).length !== 0;
};

export const getCategories = async (userId: number) => {
  const result = await categoriesModel.getCategories(userId);
  return result;
};

export const createCategory = async (
  userId: number,
  categoryDTO: CategoryDTO
) => {
  const target = await categoriesModel.getCategoryByName(
    userId,
    categoryDTO.category_name as string
  );
  if (target && doesExist(target)) {
    errorGenerator({
      message: 'CREATE_CATEGORY_FAILED: CATEGORY_EXIST',
      statusCode: 400,
    });
  }
  await categoriesModel.createCategory(userId, categoryDTO);
};

export const updateCategory = async (
  userId: number,
  categoryInfo: Category
) => {
  const target = await categoriesModel.getCategoryById(
    categoryInfo.id as number
  );
  if (doesExist(target)) {
    await categoriesModel.updateCategory(userId, categoryInfo);
  } else {
    const msg = 'UPDATE_CATEGORY_FAILED: CATEGORY_NOT_EXIST';
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};

export const deleteCategory = async (userId: number, categoryId: number) => {
  const target = await categoriesModel.getCategoryById(categoryId);
  if (doesExist(target)) {
    await categoriesModel.deleteCategory(userId, categoryId);
  } else {
    const msg = 'DELETE_CATEGORY_FAILED: CATEGORY_NOT_EXIST';
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};
