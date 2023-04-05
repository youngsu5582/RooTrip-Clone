import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';


export const redisConfig = registerAs('database.redis',()=>({
  host:process.env.REDIS_HOST,
  port :parseInt(process.env.REDIS_PORT,10),
}));

export const redisSchema = {
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
};
