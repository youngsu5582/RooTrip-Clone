import * as Joi from 'joi';

export default {
  SERVER_PORT: Joi.number().required(),
  LOG_LEVEL:Joi.string().required(),
};
