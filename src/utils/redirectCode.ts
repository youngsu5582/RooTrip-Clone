import { randomBytes } from "crypto";

export function generateRandomCode(length = 16): string {
  const buffer = randomBytes(length);
  return buffer.toString("hex");
}
