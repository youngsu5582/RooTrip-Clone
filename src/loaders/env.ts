import {config} from 'dotenv';
config({path:`config/.env.${process.env.NODE_ENV ||'development'} `});

export default {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  app: {
    port: Number(process.env.PORT) || 8000,
  },
}