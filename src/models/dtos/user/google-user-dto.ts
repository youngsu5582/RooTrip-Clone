import Profile from "../../tables/profile.entity";
import { SocialUserDto } from "./common/social-user-dto";

export type GoogleUserDto = Pick<Profile, "name"> & SocialUserDto;
