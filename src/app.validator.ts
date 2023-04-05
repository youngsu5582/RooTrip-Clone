import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';


export const appConfig = registerAs('app',()=>({
  port :parseInt(process.env.SERVER_PORT,10),
}));

export const appSchema = Joi.object({
    SERVER_PORT: Joi.number().required(),
  });
