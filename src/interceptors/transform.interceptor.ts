import { Try } from "src/types";

export function createResponseForm<T>(data: T): Try<T> {
  return {
    status: true,
    data
  } as const;
}
