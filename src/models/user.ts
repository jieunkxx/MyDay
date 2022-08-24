import { ConvertedUserDTO, TokenObj, User, UserDTO } from '../common/types';
import { insertBuilder } from './queryBuilder';
import prisma from '../prisma';

const readUserById = async (userId: number) => {
  const user: Array<User> = await prisma.$queryRaw`
    SELECT * FROM users
    WHERE id=${userId}
  `;
  return user[0];
};

const readUserByEmail = async (email: string) => {
  const user: Array<User> = await prisma.$queryRaw`
    SELECT * FROM users
    WHERE email=${email}
  `;
  return user[0];
};

const createUser = async (userInfo: UserDTO) => {
  const convertedData: ConvertedUserDTO = userInfo;
  if (convertedData.social) convertedData.social = 1;
  if (!convertedData.social) convertedData.social = 0;
  const query = insertBuilder(convertedData, 'users');
  await prisma.$queryRawUnsafe(query);
  //console.log('queryBuilder ', queryBuilder);
  // if (userInfo.social) {
  //   const query = `
  //     INSERT INTO users (
  //       email,
  //       user_name,
  //       ${userInfo.user_img ? `user_img, ` : ``}
  //       password
  //     ) VALUES (
  //        '${userInfo.email}',
  //        '${userInfo.user_name}',
  //        '${userInfo.user_img}',
  //        NULL)
  //     `;
  //await prisma.$queryRawUnsafe(query);
  //} else {
  //   await prisma.$queryRaw`
  //     INSERT INTO users (social, email, user_name, password)
  //     VALUES (0, ${userInfo.email}, ${userInfo.user_name}, ${userInfo.password})
  // `;
  //}
  const user: Array<User> = await prisma.$queryRaw`
      SELECT * FROM users WHERE email=${userInfo.email}
    `;
  return user[0];
};

const storeToken = async (token: TokenObj) => {
  await prisma.$queryRaw`
    INSERT INTO token (myday_token, kakao_token) VALUES 
    (${token.myDayToken}, ${token.kakaoToken})
  `;
};

const removeToken = async (token: string) => {
  await prisma.$queryRaw`
    DELETE FROM token WHERE myday_token=${token}
  `;
};

const readToken = async (token: string) => {
  // const kakaoToken: Array<any> = await prisma.$queryRaw`
  //   SELECT kakao_token FROM token WHERE token=${token}
  // `;
  // return kakaoToken.length > 0 ? kakaoToken[0].kakao_token : null;
  return null;
};

export default {
  readUserById,
  readUserByEmail,
  createUser,
  storeToken,
  removeToken,
  readToken,
};
