import {config} from 'dotenv';
config({path:`config/.env.${process.env.NODE_ENV ||'development'} `});

export default {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  app: {
    port: Number(process.env.PORT) || 8000,
  },
    database:{
      typeorm : {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        logging : process.env.LOGGING,      
      },
      s3:{
        accessKey : process.env.S3_ACCESS_KEY,
        secretKey : process.env.S3_SECRET_KEY,
        bucketName : String(process.env.S3_BUCKET_NAME),
      },
      redis:{
        host : process.env.REDIS_HOST,
        port : process.env.REDIS_POST,
      }
    },
}