import { SetMetadata } from "@nestjs/common";

export const setCustomMetadata = (symbol: symbol | string, data: any) =>
  SetMetadata(symbol, data);
