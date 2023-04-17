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