import { Request } from "express";

/**
 * @summary AccessToken 추출
 * @description Request Header Authorization 에 존재하는 Token을 추출한다.
 *
 * @param req
 * @returns
 */
export const extractAccessToken = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
};

/**
 * @summary RefreshToken 추출
 * @description Request Body grant_type 에 존재하는 refresh token 을 추출한다.
 *
 * @param req
 * @returns
 */
export const extractRefreshToken = (req: Request) => {
  if (req.body.refresh_token && req.body.grant_type === "refresh_token") {
    return req.body.refresh_token;
  }
};
