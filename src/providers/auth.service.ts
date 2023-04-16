import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../models/repositories/user.repository";
import { User } from "../models/tables/user.entity";
import { CreateUserDto } from "../models/dtos/create-user-dto";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly _userRepository: UsersRepository
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const alreadyCreatedEmail = await this._userRepository.findOne({
      where: { email }
    });
    if (alreadyCreatedEmail && email!==null)
      return {
        status: false,
        message: "중복된 이메일이 있습니다."
      }
    const user = await this._userRepository.save(
      User.create({ ...createUserDto })
    ).catch(()=>null);

    if (user) {
      return {
        status: true,
        message: "회원가입 성공"
      };
    }
    else{
      return {
        status : false,
        message: "회원가입 실패"
      }
    }
  }
  async checkDuplicateEmail(email:string){
    return Boolean(!(await this._userRepository.getByEmail(email)));
  }
  async checkDuplicateNickname(nickname:string){
    return Boolean(!(await this._userRepository.getByNickname(nickname)));
  }
}
