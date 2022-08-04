import { Request, Response } from 'express';
import { User, ContentInfo } from '../common/types';
import * as contentsService from './../services/contents';

export const getContents = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const contents = await contentsService.getContents(user);
  res.status(200).json({ data: contents });
};

export const addContents = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const contentInfo: ContentInfo = req.body;
  await contentsService.addContents(user.id as any, contentInfo);
  res.status(201).json({ message: 'content created' });
};

export const updateContents = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const contentInfo: ContentInfo = req.body;
  await contentsService.updateContents(user.id as any, contentInfo);
  res.status(201).json({ message: 'content updated' });
};
export const deleteContents = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const contentInfo: ContentInfo = req.body;
  await contentsService.deleteContents(user.id as any, contentInfo);
  res.status(201).json({ message: 'content deleted' });
};
