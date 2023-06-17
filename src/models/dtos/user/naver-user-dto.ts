import { User } from "src/models/tables/user.entity";
import Profile from "../../tables/profile.entity";
import { SocialUserDto } from "./common/social-user-dto";

export type NaverUserDto = Pick<Profile, "gender" | "name"> &
  Pick<User, "email"> &
  SocialUserDto;
