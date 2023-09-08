import Profile from "src/models/tables/profile.entity";
import { User } from "src/models/tables/user.entity";
type CreateProfileDto = Pick<Profile, "nickname" | "name">;

type CreateUserDto = Pick<User, "email" | "password">;

export interface CreateLocalUserDto extends CreateUserDto, CreateProfileDto {}
