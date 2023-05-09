import { User } from "../tables/user.entity";

export type LoginUserDto = Pick<User, "email" | "password">;
