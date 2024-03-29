import { ERROR } from "src/errors";
import { GoogleUserDto } from "src/models/dtos/user/google-user-dto";
import { KakaoUserDto } from "src/models/dtos/user/kakao-user-dto";
import { NaverUserDto } from "src/models/dtos/user/naver-user-dto";
export type GenderType = "m" | "w";
export type CheckType = "email" | "nickname";
export type CheckDuplicateDto = {
  /**
   * checkType
   */
  checkType: string;
  /**
   * check 할 값
   */
  value: string;
};
export type CustomJwtPayload = {
  [key: string]: any;
  userId: string;
  iat: number;
  exp: number;
};
export type socialType = "kakao" | "naver" | "google";

export type SocialLoginType = KakaoUserDto | NaverUserDto | GoogleUserDto;

export interface ResponseForm<T> {
  status: true;
  message?: string;
  //requestToResponse : `${number}ms`;
  data?: T | undefined;
}
export interface ErrorForm<T> {
  status: false;
  message?: string;
  data?: T;
}

export type Try<T> = ResponseForm<T>;
export type Catch<T> = ErrorForm<T>;
export type TryCatch<T, E extends ERROR> = ResponseForm<T> | ErrorForm<E>;

export interface Coordinate {
  /**
   * 사진의 위도 (latitude)
   * 한국의 위도는 33 에서 39 사이
   *
   * @minimum 33
   * @maximum 38.999
   *
   */
  latitude: number;
  /**
   * 사진의 경도 (longitude)
   * 한국의 경도는 125 에서 132 사이
   *
   * @minimum 125
   * @maximum 131.999
   *
   */
  longitude: number;
}

export type RegionType =
  | "서울"
  | "대구"
  | "부산"
  | "충청남도"
  | "충청북도"
  | "대전"
  | "세종"
  | "울산"
  | "전라남도"
  | "전라북도"
  | "제주도"
  | "인천";

export interface RouteDto {
  /**
   * 대한민국 행정구역을 받아오는 배열
   *
   * @minItems 2
   * @maxItems 3
   *
   */
  cities: Array<RegionType>;
}
