import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(userInfo) {
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
  const user: Array<Object> = await prisma.$queryRaw`
    SELECT * FROM users WHERE email=${userInfo.email}
  `;
  return user[0];
}
