import { registerAs } from "@nestjs/config";

export default registerAs("key", () => ({
  kakaoRestApi: process.env.KAKAO_REST_API_KEY,
  kakaoRedirectUri: process.env.KAKAO_REDIRECT_URI,
  naverClientId: process.env.NAVER_CLIENT_ID,
  naverClientSecret: process.env.NAVER_CLIENT_SECRET_KEY
}));
