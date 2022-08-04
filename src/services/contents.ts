import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import { User, ContentInfo } from '../common/types';
import * as contentsModel from '../models/contents';

const doesExist = async (user: User, contentInfo: ContentInfo) => {
  const categoryId = await contentsModel.readCategoryId(user, contentInfo);
  return categoryId;
};

export const getContents = async (user: User) => {
  // const result = await contentsModel.getContents(user.id);
  // return result;
};

export const addContents = async (user: User, contentInfo: ContentInfo) => {
  // let msg,
  // let categoryId = await doesExist(user, contentInfo);
  // if (!categoryId) {
  //   // create category
  //   // return category id
  //   categoryId = await readCategory();
  // }
  // // find
};
export const updateContents = async (
  user: User,
  contentInfo: ContentInfo
) => {};
export const deleteContents = async (
  user: User,
  contentInfo: ContentInfo
) => {};
