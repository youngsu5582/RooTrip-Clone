import { CustomRepository } from "../../config/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";
import { User } from "../tables/user.entity";

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  public async getByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }

  public async deleteRefreshTokenById(id: string) {
    return await this.update(id, { refreshToken: null });
  }
}
