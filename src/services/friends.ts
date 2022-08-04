import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';

import * as friends from '../models/friends';

export const getFriends = async (req: Request, res: Response) => {};
export const addFriends = async (req: Request, res: Response) => {};
export const deleteFriends = async (req: Request, res: Response) => {};
