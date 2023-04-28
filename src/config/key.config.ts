import { registerAs } from "@nestjs/config";
export default registerAs("key", () => ({
  kakaoApiKey: process.env.KAKAO_REST_API_KEY || "key",
  kakaoRedirectUri: process.env.KAKAO_REDIRECT_URI,
  naverClientKey: process.env.NAVER_CLIENT_ID,
  naverSecretKey: process.env.NAVER_CLIENT_SECRET_KEY
}));
