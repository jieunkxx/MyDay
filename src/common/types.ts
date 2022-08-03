export interface User {
  id?: number;
  user_name?: string;
  email?: string;
  social?: boolean;
  password?: string;
  user_img?: string;
  created_at?: Date;
  update_at?: Date;
}

export interface UserInfo {
  user_name: string;
  email: string;
  social: boolean;
  user_img: string | null;
  password: string | null;
}

export interface CustomError {
  statusCode?: number;
  message: string;
}
