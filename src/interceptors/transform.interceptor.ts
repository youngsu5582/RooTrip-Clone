import { Logger } from "@nestjs/common";
import { ERROR } from "src/errors";
import { Catch, Try } from "src/types";
import { isDevelopment } from "src/utils/env";
export function createResponseForm<T>(data: T, message?: string): Try<T> {
  return {
    status: true,
    ...(data !== null && { data }),
    message
  } as const;
}
export function createErrorForm<T extends ERROR>(
  data: T,
  metadata?: any
): Catch<T> {
  const logger = new Logger("ErrorLogger");
  if (isDevelopment() && metadata) logger.log(metadata);
  return data;
}
//
