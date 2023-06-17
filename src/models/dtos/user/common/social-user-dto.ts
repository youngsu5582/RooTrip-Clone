import { User } from "src/models/tables/user.entity";

export type SocialUserDto = Pick<User, "id">;
