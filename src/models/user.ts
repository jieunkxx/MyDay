import { User, UserInfo } from '../common/types';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const readUserById = async (userId: number) => {
  const user: Array<User> = await prisma.$queryRaw`
    SELECT * FROM users
    WHERE id=${userId}
  `;
  return user[0];
};

export const readUserByEmail = async (email: string) => {
  const user: Array<User> = await prisma.$queryRaw`
    SELECT * FROM users
    WHERE email=${email}
  `;
  return user[0];
};

export const createUser = async (userInfo: UserInfo) => {
  if (userInfo.social) {
    const query = `
      INSERT INTO users (
        email,
        user_name,
        ${userInfo.user_img ? `user_img, ` : ``}
        password
      ) VALUES (
         '${userInfo.email}',
         '${userInfo.user_name}',
         '${userInfo.user_img}',
         NULL)
      `;
    await prisma.$queryRawUnsafe(query);
  } else {
    await prisma.$queryRaw`
      INSERT INTO users (social, email, user_name, password)
      VALUES (0, ${userInfo.email}, ${userInfo.user_name}, ${userInfo.password})
  `;
  }
  const user: Array<User> = await prisma.$queryRaw`
    SELECT * FROM users WHERE email=${userInfo.email}
  `;
  return user[0];
};
