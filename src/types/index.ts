export type CheckType = "email"|"nickname";
export type CheckDto = {
    type : CheckType,
    data : string,
}