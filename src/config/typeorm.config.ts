import { registerAs } from '@nestjs/config';
export default registerAs('database.typeorm', () => ({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DABASE_NAME,
}));
