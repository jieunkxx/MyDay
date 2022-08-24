import { Request, Response } from 'express';
import { User, ContentDTO } from '../common/types';
import * as contentsService from './../services/contents';

export const getContents = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const { date } = req.body;
  const contents = await contentsService.getContents(
    user.id as number,
    date as string
  );
  res.status(200).json({ contents });
};

export const getContentsByCategory = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const contents = await contentsService.getContentsByCategory(
    user.id as number
  );
  res.status(200).json({ contents });
};

export const createContents = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const contentInfo: ContentDTO = req.body;
  await contentsService.createContents(user.id as number, contentInfo);
  res.status(201).json({ message: 'content created' });
};

export const updateContents = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const contentInfo: ContentDTO = req.body;
  await contentsService.updateContents(user.id as number, contentInfo);
  res.status(201).json({ message: 'content updated' });
};
export const deleteContents = async (req: Request, res: Response) => {
  const user: User = (<any>req).user;
  const searchParams = new URLSearchParams(<any>req.query);
  const contentId = searchParams.get('contentId');
  await contentsService.deleteContents(user.id as number, Number(contentId));
  res.status(201).json({ message: 'content deleted' });
};
