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

export declare namespace UserType {
  interface LoginResponse {
    expire: number;
    accessToken: string;
    refreshToken: string;
  }
  interface ReissueResponse {
    expire: number;
    accessToken: string;
  }
}

export declare namespace PhotoType {
  interface reverseResponse {
    city: string;
    first: string;
    second: string;
    coordinate: string;
  }
}

export interface Coordinate {
  /**
   * 사진의 위도 (latitude)
   * 한국의 위도는 33 에서 38 사이
   *
   * @minimum 33
   * @maximum 38
   *
   */
  latitude: number;
  /**
   * 사진의 경도 (longitude)
   * 한국의 경도는 125 에서 131 사이
   *
   * @minimum 125
   * @maximum 131
   *
   */
  longitude: number;
}
