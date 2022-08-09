import internal from 'stream';

export interface CustomErrorSetup {
  statusCode: number;
  message: string;
}
export interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

export interface User {
  id?: number;
  user_name?: string;
  email?: string;
  social?: boolean;
  password?: string | null;
  user_img?: string | null;
  created_at?: Date;
  update_at?: Date;
}

export interface UserDTO {
  user_name: string;
  email: string;
  social: boolean;
  user_img: string | null;
  password: string | null;
}

export interface ConvertedUserDTO extends Omit<UserDTO, 'social'> {
  social: boolean | number;
}

export interface EncodedToken {
  token: string;
  expires: number;
  issued?: number;
}

export interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}

export interface ContentDTO {
  id?: number;
  title: string;
  memo?: string;
  createCategory?: boolean;
  category_id?: number;
  category_name?: string;
  color_name?: string;
  start_time?: Date;
  end_time?: Date;
}

export interface Category {
  id?: number;
  category_name?: string;
  color_id?: number;
  user_id?: number;
}

export type CategoryDTO = Category;

export interface Budget {
  id?: number;
  yearweek?: number;
  budget?: number;
  remains?: number;
  category_id?: number;
  weeklyBudget_id?: number;
}

export interface BudgetDTO {
  category_id: number;
  budget: number;
  yearWeek: string;
}
