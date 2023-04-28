export type CheckType = "email" | "nickname";
export type CheckDto = {
  type: CheckType;
  data: string;
};
export type ServiceResponseForm = {
  status: boolean;
  message?: string;
  data?: any;
};

export type CustomJwtPayload = {
  [key: string]: any;
  userId: string;
  iat: number;
  exp: number;
};
export type socialType = "kakao" | "naver" | "google";
