import * as Joi from "joi";
export default {
  KAKAO_REST_API_KEY: Joi.string().required(),
  KAKAO_REDIRECT_URI: Joi.string().required(),
  NAVER_CLIENT_ID: Joi.string().required(),
  NAVER_CLIENT_SECRET_KEY: Joi.string().required()
};
