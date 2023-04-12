import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  port: parseInt(process.env.SERVER_PORT, 10),
  logLevel : process.env.LOG_LEVEL,
}));
  