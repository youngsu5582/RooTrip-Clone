import * as Joi from "joi";
export default {
  S3_ACCESS_KEY: Joi.string().required(),
  S3_SECRET_KEY: Joi.string().required(),
  S3_BUCKET_NAME: Joi.string().required(),
  S3_BUCKET_URL: Joi.string().required()
};
