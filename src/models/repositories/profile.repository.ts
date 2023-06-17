import { CustomRepository } from "../../config/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";
import Profile from "../tables/profile.entity";

@CustomRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  public async getByNickname(nickname: string) {
    return await this.findOne({ where: { nickname } });
  }
}
