import { CustomRepository } from "../../config/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";
import { User } from "../tables/user.entity";
import { MeasureQueryExecutionTime } from "../../decorator/function/check-query-time.decorator";

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  @MeasureQueryExecutionTime()
  public async getByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }

  public async deleteRefreshTokenById(id: string) {
    return await this.update(id, { refreshToken: null });
  }
}
  