import * as Joi from 'joi';

export default {
  SERVER_PORT: Joi.number().required(),
};