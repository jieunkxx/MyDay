import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import { TokenObj, User, UserDTO } from '../common/types';
import { userModel } from '../models';
import { sign } from 'crypto';
import { CustomError } from '../common/class';
import dotenv from 'dotenv';
import errorGenerator from '../utils/errorGenerator';
dotenv.config();
const KAKAO_OAUTH_TOKEN_API_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_OAUTH_LOGOUT_API_URL = 'https://kauth.kakao.com/oauth/logout';
const KAKAO_GET_USER_API_URL = 'https://kapi.kakao.com/v2/user/me';
const KAKAO_LOGOUT_URL = 'https://kapi.kakao.com/v1/user/logout';
const KAKAO_GRANT_TYPE = 'authorization_code';
const KAKAO_CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=utf-8';
const KAKAO_CLIENT_ID = process.env.REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.REDIRECT_URI;
const KAKAO_CLIENT_SECRET = process.env.CLIENT_SECRET;
const SECRET_KEY = process.env.SECRET_KEY;
const salt = bcrypt.genSaltSync();

const tokenObj = {
  myDayToken: '',
  kakaoToken: '',
};

const doesUserExist = async (email: string) => {
  const user = await userModel.readUserByEmail(email);
  return user;
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isInputValid = (userInfo: UserDTO, social: boolean, option: string) => {
  let msg = null;
  if (!userInfo) {
    msg = 'INVALID_USER_INFO';
  }

  if (!validateEmail(userInfo.email)) {
    msg = `EMAIL_NOT_VALID`;
  }

  if (!social) {
    if ((userInfo.password?.length as number) < 7) {
      msg = 'PASSWORD_NOT_VALID';
    }
  }

  if (option === 'signup') {
    if (userInfo.user_name == null || userInfo.user_name?.length < 2) {
      msg = 'USER_NAME_REQUIRED. user_name.length > 1';
    }
  }

  if (msg) {
    const error = new CustomError(msg, 400);
    throw error;
  }
};

const createToken = async (userId: number) => {
  try {
    const token = jwt.sign({ id: userId }, SECRET_KEY as string, {
      expiresIn: '24h',
    });
    return token;
  } catch (err) {
    const msg = 'CREATE_TOKEN_FAILED';
    const error = new CustomError(msg, 400);
    throw error;
  }
};

export const getUserInfo = async () => {};
export const signup = async (userInfo: UserDTO, social: boolean) => {
  const checkEmailExist: User = await userModel.readUserByEmail(userInfo.email);
  if (!checkEmailExist) {
    isInputValid(userInfo, social, 'signup');
    const signupInput = {
      user_name: userInfo.user_name,
      email: userInfo.email,
      social: social,
      password: social
        ? null
        : bcrypt.hashSync(userInfo.password as string, salt),
      user_img: userInfo.user_img || null,
    };
    const user = await userModel.createUser(signupInput);
    return user.id;
  } else {
    const msg = 'SIGNUP_FAILED: EMAIL_EXIST';
    const error = new CustomError(msg, 400);
    throw error;
  }
};

export const login = async (userInfo: UserDTO) => {
  isInputValid(userInfo, false, 'login');
  const user: User = await userModel.readUserByEmail(userInfo.email);
  let errMsg;

  if (!user) {
    errMsg = `USER_NOT_EXIST`;
  } else if (user.social) {
    errMsg = `SOCIAL_USER`;
  } else {
    const isValid = await bcrypt.compare(
      userInfo.password as string,
      user.password as string
    );
    if (!isValid) {
      errMsg = 'EMAIL_PASSWORD_NOT_MATCH';
    } else {
      const token = await createToken(user.id as number);
      return token;
    }
  }
  const error = new CustomError(errMsg, 400);
  throw error;
};

const getKakaoToken = async (code: any) => {
  try {
    const kakaoToken = await axios({
      method: 'POST',
      url: KAKAO_OAUTH_TOKEN_API_URL,
      headers: {
        'Content-type': KAKAO_CONTENT_TYPE,
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        grant_type: KAKAO_GRANT_TYPE,
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: KAKAO_REDIRECT_URI,
        code: code,
        client_secret: KAKAO_CLIENT_SECRET,
      },
    });
    return kakaoToken;
  } catch (error) {
    throw error;
  }
};

const getKakaoUserInfo = async (accessToken: string) => {
  try {
    const userInfo = await axios({
      method: 'GET',
      url: KAKAO_GET_USER_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
    return userInfo;
  } catch (error) {
    //error.statusCode = 400;
    throw error;
  }
};

const getUserInfoByKakaoToken = async (code: any) => {
  const kakaoToken = await getKakaoToken(code);
  const accessToken = kakaoToken.data.access_token;
  tokenObj.kakaoToken = accessToken;
  const kakaoUserInfo = await getKakaoUserInfo(accessToken);
  const kakaoAccount = kakaoUserInfo.data.kakao_account;
  const kakaoProperties = kakaoUserInfo.data.properties;
  if (!kakaoAccount.has_email || !kakaoAccount.email) {
    const msg = 'SIGNUP_FAILED: EMAIL_NEEDS_AGREEMENT';
    errorGenerator({ message: msg, statusCode: 400 });
  } else {
    const email = kakaoAccount.email;
    const user_name = !kakaoAccount.profile_nickname_needs_agreement
      ? kakaoProperties.nickname
      : kakaoAccount.email;
    const user_img = !kakaoAccount.profile_image_needs_agreement
      ? kakaoProperties.profile_image
      : null;

    const userInfo = {
      email: email,
      user_name: user_name,
      user_img: user_img,
      social: true,
    };
    return userInfo;
  }
};
const terminateToken = async (myDayToken: TokenObj['myDayToken']) => {
  const tokenExist = await userModel.readToken(myDayToken);
  if (tokenExist) {
    await userModel.removeToken(myDayToken);
  }
};

const tokenToDB = async (tokenObj: TokenObj) => {
  try {
    await userModel.storeToken(tokenObj);
    setTimeout(async () => {
      await terminateToken(tokenObj.myDayToken);
    }, 1000 * 60 * 60);
  } catch (error) {
    throw error;
  }
};

export const kakaoLogin = async (code: any) => {
  const userInfo = await getUserInfoByKakaoToken(code);
  const user = await doesUserExist(userInfo?.email as string);
  let userId;
  if (!user) {
    userId = await signup(userInfo as UserDTO, true);
  }
  if (user && !user.social) {
    //userId = await transferUserToSocialUser(userInfo);
  }
  if (user && user.social) {
    userId = user.id;
  }
  const token = await createToken(userId as number);
  tokenObj.myDayToken = token;
  await tokenToDB(tokenObj);
  return token;
};

export const kakaoLogout = async (myDayToken: string) => {
  try {
    const accessToken = await userModel.readToken(myDayToken);
    const kakaoId = await axios({
      method: 'POST',
      url: KAKAO_LOGOUT_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
    //console.log('call kakaoAccountLogout');
    //await kakaoAccountLogout();
    await terminateToken(myDayToken);
  } catch (error) {
    throw error;
  }
};
