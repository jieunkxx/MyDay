import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import { User, ContentInfo } from '../common/types';
import * as contentsModel from '../models/contents';
import * as categoryModel from '../models/categories';

const doesExist = async (user: User, contentInfo: ContentInfo) => {
  const categoryId = await categoryModel.readCategory(user, contentInfo);
  return categoryId;
};

export const getContents = async (user: User) => {
  const result = await contentsModel.getContents(user.id as number);
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

export const updateContents = async (
  user: User,
  contentInfo: ContentInfo
) => {};
export const deleteContents = async (
  user: User,
  contentInfo: ContentInfo
) => {};
