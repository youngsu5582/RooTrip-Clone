import { User } from "../tables/user.entity";

export type CreateUserDto = Pick<
  User,
  "email" | "password" | "gender" | "nickname" | "name"
>;
