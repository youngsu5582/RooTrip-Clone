import { UserDto } from "./user-dto";

export interface SocialUserDto extends UserDto {
  /**
   * 사용자의 id
   * @description 각 소셜 로그인 에서 id 를  받아옴
   */
  id: string;
}
