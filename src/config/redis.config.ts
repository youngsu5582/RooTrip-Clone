import { registerAs } from "@nestjs/config";

export default registerAs("database.redis", () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT, 10)
}));
