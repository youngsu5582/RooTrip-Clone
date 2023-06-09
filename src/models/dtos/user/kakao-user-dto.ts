import Profile from "../../tables/profile.entity";
import { SocialUserDto } from "./common/social-user-dto";

export type KakaoUserDto = Pick<Profile, "name"> & SocialUserDto;
