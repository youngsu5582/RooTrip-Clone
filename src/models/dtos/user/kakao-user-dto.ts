import Profile from "../../tables/profile.entity";

export type KakaoUserDto = Pick<Profile, "id" | "name">;
