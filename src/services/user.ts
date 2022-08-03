import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';

import * as user from '../models/user';

const salt = bcrypt.genSaltSync();

export const signup = async (req: Request, res: Response) => {};
export const login = async (req: Request, res: Response) => {};
