import { registerAs } from "@nestjs/config";

export default registerAs("database.s3", () => ({
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  bucketName: process.env.S3_BUCKET_NAME,
  bucketUrl: process.env.S3_BUCKET_URL
}));
