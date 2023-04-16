import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CreateUserDto } from "src/models/dtos/create-user-dto";
import { UsersRepository } from "src/models/repositories/user.repository";
import { UserService } from "src/providers/user.service";

const userDto: CreateUserDto = {
  email: "test@gmail.com",
  gender: "m",
  name: "test",
  nickname: "testnickname",
  password: "testest1234!",
};
describe("User service", () => {
  let service: UserService;
  let repository: UsersRepository;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UserService,
        {
          provide: UsersRepository,
          useValue: {
            UsersRepository
          }
        }
      ]
    }).compile();
    service = module.get<UserService>(UserService);
    await service.create(userDto);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  afterAll(() => {
    module.close();
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  describe("create", () => {
    afterAll(() => repository.delete({}));
    it("1. Create", async () => {
      const newUserDto: CreateUserDto = {
        email: "test12@gmail.com",
        gender: "m",
        name: "testname",
        nickname: "testnickname",
        password: "testest1234!",
      };
      const result = await service.create(newUserDto);
      expect(result).toEqual({
        status: true,
        message: "회원가입 성공"
      });
    });

    it("2.If duplicated email , should return error ", async () => {
      const duplicatedEmailDto: CreateUserDto = {
        email: "test@gmail.com",
        gender: "m",
        name: "duplicated",
        nickname: "duplicated",
        password: "duplicated",
      };
      const result = await service.create(duplicatedEmailDto);
      expect(result).toEqual({
        status: false,
        message: "중복된 이메일이 있습니다."
      });
    })
    it("3.If Invalid dto , should return error",async()=>{
        const invalidDto:CreateUserDto={
            email:null,
            gender:"m",
            name:null,
            nickname:null,
            password:null
        }
        const result = await service.create(invalidDto);
        expect(result).toEqual({
            status:false,
            message: "회원가입 실패"
        })
    })
  });
});
