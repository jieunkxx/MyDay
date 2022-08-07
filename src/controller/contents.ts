import { Request, Response } from 'express';
import { DecodedToken, User, ContentInfo } from '../common/types';
import * as contentsService from './../services/contents';

export const getContents = async (req: Request, res: Response) => {
  const user: DecodedToken = (<any>req).user;
  const contents = await contentsService.getContents(user.id);
  res.status(200).json({ data: contents });
};

export const createContents = async (req: Request, res: Response) => {
  const user: DecodedToken = (<any>req).user;
  const contentInfo: ContentInfo = req.body;
  await contentsService.createContents(user.id as number, contentInfo);
  res.status(201).json({ message: 'content created' });
};

export const updateContents = async (req: Request, res: Response) => {
  const user: DecodedToken = (<any>req).user;
  const contentInfo: ContentInfo = req.body;
  await contentsService.updateContents(user.id as number, contentInfo);
  res.status(201).json({ message: 'content updated' });
};
export const deleteContents = async (req: Request, res: Response) => {
  const user: DecodedToken = (<any>req).user;
  const searchParams = new URLSearchParams(<any>req.query);
  const contentId = searchParams.get('contentId');
  await contentsService.deleteContents(user.id as number, Number(contentId));
  res.status(201).json({ message: 'content deleted' });
};
