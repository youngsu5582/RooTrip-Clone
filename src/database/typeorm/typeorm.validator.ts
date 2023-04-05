import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';


export const typeormConfig = registerAs('database.typeorm',()=>({
  host:process.env.DATABASE_HOST,
  port :parseInt(process.env.DATABASE_PORT,10),
  username:process.env.DATABASE_USERNAME,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DABASE_NAME
}));

export const typeormSchema = {
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME : Joi.string().required(),
  };
