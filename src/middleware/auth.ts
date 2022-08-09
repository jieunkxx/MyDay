import * as jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as userModel from '../models/user';
import { CustomError, DecodedToken } from '../common/types';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header: any = req.headers.authorization;
    const token: string = header.split(' ')[1];
    //const token = req.headers.authorization;
    const decodedToken = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string
    ) as JwtPayload;
    const userId: number = decodedToken.id;
    const user = await userModel.readUserById(userId);
    if (!user) {
      res.status(401).send('Unauthorized');
    } else {
      (<any>req).token = token;
      (<any>req).user = user;
      next();
    }
  } catch (err) {
    const error = err as CustomError;
    res.status(error.statusCode || 400).json({ message: error.message });
    next(error);
  }
};

export default verifyToken;
