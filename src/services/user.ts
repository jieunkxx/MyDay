import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import { User, UserInfo, CustomError } from '../common/types';
import * as userModel from '../models/user';
import { sign } from 'crypto';

const SECRET_KEY = process.env.SECRET_KEY;
const salt = bcrypt.genSaltSync();
const doesUserExist = async (email: string) => {
  const user = await userModel.readUserByEmail(email);
  return user;
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isInputValid = (userInfo: UserInfo, social: boolean, option: string) => {
  let msg = null;
  if (!userInfo) {
    msg = 'INVALID_USER_INFO';
  }

  if (!validateEmail(userInfo.email)) {
    msg = `EMAIL_NOT_VALID`;
  }

  if (!social) {
    if ((userInfo.password?.length as number) < 7) {
      msg = 'PASSWORD_NOT_VALID';
    }
  }

  if (option === 'signup') {
    if (userInfo.user_name == null || userInfo.user_name?.length < 2) {
      msg = 'USER_NAME_REQUIRED. user_name.length > 1';
    }
  }

  if (msg) {
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};

const createToken = async (userId: number) => {
  try {
    const token = jwt.sign({ id: userId }, SECRET_KEY as string, {
      expiresIn: '24h',
    });
    return token;
  } catch (err) {
    const error = err as CustomError;
    error.statusCode = 400;
    error.message = 'CREATE_TOKEN_FAILED';
    throw error;
  }
};

export const signup = async (userInfo: UserInfo, social: boolean) => {
  const checkEmailExist: User = await userModel.readUserByEmail(userInfo.email);
  if (!checkEmailExist) {
    isInputValid(userInfo, social, 'signup');
    const signupInput = {
      user_name: userInfo.user_name,
      email: userInfo.email,
      social: social,
      password: social
        ? null
        : bcrypt.hashSync(userInfo.password as string, salt),
      user_img: userInfo.user_img || null,
    };
    const user = await userModel.createUser(signupInput);
    return user.id;
  } else {
    const msg = 'SIGNUP_FAILED: EMAIL_EXIST';
    const error: CustomError = new Error(msg);
    error.statusCode = 400;
    throw error;
  }
};

export const login = async (userInfo: UserInfo) => {
  isInputValid(userInfo, false, 'login');
  const user: User = await userModel.readUserByEmail(userInfo.email);
  let errMsg;

  if (!user) {
    errMsg = `USER_NOT_EXIST`;
  } else if (user.social) {
    errMsg = `SOCIAL_USER`;
  } else {
    const isValid = await bcrypt.compare(
      userInfo.password as string,
      user.password as string
    );
    if (!isValid) {
      errMsg = 'EMAIL_PASSWORD_NOT_MATCH';
    } else {
      const token = await createToken(user.id as number);
      return token;
    }
  }
  const error: CustomError = new Error(errMsg);
  error.statusCode = 400;
  throw error;
};
