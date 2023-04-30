import { ERROR } from "src/errors";
import { KakaoUserDto } from "src/models/dtos/kakao-user-dto";

export type CheckType = "email" | "nickname";
export type CheckDto = {
  type: CheckType;
  data: string;
};
export type MessageResponse = {
  message: string;
};
export type ServiceResponseForm = {
  status: boolean;
  data?: any;
};

export type CustomJwtPayload = {
  [key: string]: any;
  userId: string;
  iat: number;
  exp: number;
};
export type socialType = "kakao" | "naver" | "google";

export type SocialLoginType = KakaoUserDto;

export interface ResponseForm<T> {
  status: true;
  message?: string;
  //requestToResponse : `${number}ms`;
  data: T;
}

export type Try<T> = ResponseForm<T>;
export type TryCatch<T, E extends ERROR> = ResponseForm<T> | E;
