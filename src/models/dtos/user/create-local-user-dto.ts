import Profile from "src/models/tables/profile.entity";
import { User } from "src/models/tables/user.entity";
type CreateProfileDto = Pick<Profile, "nickname" | "name" | "gender">;

type CreateUserDto = Pick<User, "email" | "password">;

export type CreateLocalUserDto = CreateUserDto & CreateProfileDto;
