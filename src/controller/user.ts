import express from 'express';
import { Request, Response } from 'express';

import * as userService from './../services/user';

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
