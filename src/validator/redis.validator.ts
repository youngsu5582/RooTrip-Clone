import * as Joi from 'joi';
export default {
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
};
