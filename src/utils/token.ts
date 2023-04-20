import { Request } from "express";

export const extractAccessToken = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
};

export const extractRefreshToken = (req: Request) => {
  if (req.body.refresh_token && req.body.grant_type === "refresh_token") {
    return req.body.refresh_token;
  }
};
