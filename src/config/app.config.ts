import { registerAs } from "@nestjs/config";
export default registerAs("app", () => ({
  port: parseInt(process.env.SERVER_PORT, 10),
  logLevel: process.env.LOG_LEVEL,
  jwtAccessSecret:
    process.env.JWT_SECRET_ACCESS_KEY || "Random_Secret_Access_x*nd23",
  jwtRefreshSecret:
    process.env.JWT_SECRET_REFRESH_KEY || "Random_Secret_Refresh_!@39*SD",
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD
}));
