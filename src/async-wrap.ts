import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { customError } from './utils/error';

function asyncWrap(asyncController: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncController(req, res);
    } catch (err: unknown) {
      const error = err as customError;
      res.status(error.statusCode || 400).json({ message: error.message });
      next(error);
    }
  };
}

export default asyncWrap;
