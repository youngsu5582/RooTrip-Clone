import * as Joi from "joi";

export default {
  SERVER_PORT: Joi.number().required(),
  LOG_LEVEL: Joi.string().required(),
  JWT_SECRET_ACCESS_KEY : Joi.string().required(),
  JWT_SECRET_REFRESH_KEY : Joi.string().required(),
};
