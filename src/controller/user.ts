import express from 'express';
import { Request, Response } from 'express';
import { User } from '../common/types';

import * as userService from './../services/user';
import dotenv from 'dotenv';
dotenv.config();
import errorGenerator from '../utils/errorGenerator';
const FRONT_REDIRECT_URL = process.env.FRONT_REDIRECT_URL;
export const signup = async (req: express.Request, res: express.Response) => {
  const userInfo = req.body;
  await userService.signup(userInfo, false);
  res.status(201).json({ message: 'SIGNUP_SUCCEEDED' });
};

export const login = async (req: Request, res: Response) => {
  const userInfo = req.body;
  const token = await userService.login(userInfo);
  res.status(201).json({ token: token });
};

export const kakaoLogin = async (req: Request, res: Response) => {
  const code = req.query.code;
  const token = await userService.kakaoLogin(code);
  if (token) {
    const searchParams = new URLSearchParams({ token: token }).toString();
    res.redirect(`${FRONT_REDIRECT_URL}/?${searchParams}`);
  } else {
    const msg = 'REQUEST_KAKAO_TOKEN_FAILED';
    errorGenerator({ message: msg, statusCode: 400 });
  }
};

export const kakaoLogout = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const myDayToken = (<any>req).myDayToken;
  if (user.social) {
    if (myDayToken) {
      const kakaoId = await userService.kakaoLogout(myDayToken);
      return res.status(201).json({ message: 'KAKAO_USER_LOGOUT_SUCCEEDED' });
    } else {
      const msg = 'KAKAO_USER_LOGOUT_FAILED';
      errorGenerator({ message: msg, statusCode: 400 });
    }
  } else {
    return res.status(201).json({ message: 'NOT_SOCIAL_USER' });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  res.status(200).json({ user });
};
