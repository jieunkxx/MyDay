import jwt from 'jsonwebtoken';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //const token = req.headers.authorization.split(' ')[1]; // front => header
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.id;
    const user = await readUserById(userId);
    if (!user) {
      res.status(401).send('Unauthorized');
    } else {
      req.token = token;
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
    next(error);
  }
};

export default verifyToken;
