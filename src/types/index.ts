import { ERROR } from "src/errors";
import { KakaoUserDto } from "src/models/dtos/user/kakao-user-dto";

import { Post } from "src/models/tables/post.entity";

export type GenderType = "m" | "w";
export type CheckType = "email" | "nickname";
export type CheckDuplicateDto = {
  checkType: CheckType;
  value: string;
};
export type MessageResponse = {
  message: string;
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
export declare namespace RouteType {
  interface routeResponse {
    post: Post;
    id: string;
    coordinate: string;
    imageUrl: string;
    commentCount: number;
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
