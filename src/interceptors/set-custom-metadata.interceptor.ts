import { SetMetadata } from "@nestjs/common";

export const setCustomMetadata = (symbol : Symbol | string , data:any)=>SetMetadata(symbol,data);