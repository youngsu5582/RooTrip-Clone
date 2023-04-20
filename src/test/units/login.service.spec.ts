import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CreateUserDto } from "src/models/dtos/create-user-dto";
import { UsersRepository } from "src/models/repositories/user.repository";
import { AuthService } from "src/providers/auth.service";
import { LoginService } from "src/providers/login.service";
import { LoginUserDto } from "src/models/dtos/login-user-dto";
import { ServiceResponseForm } from "src/types";
import { User } from "src/models/tables/user.entity";
const userDto: CreateUserDto = {
  email: "test@gmail.com",
  gender: "m",
  name: "test",
  nickname: "testnickname",
  password: "testtest1234!"
};
describe("Login service", () => {
  let authService: AuthService;
  let loginService: LoginService;
  let repository: UsersRepository;
  let module: TestingModule;
  let result: ServiceResponseForm;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: {
            UsersRepository
          }
        }
      ]
    }).compile();
    authService = module.get<AuthService>(AuthService);
    loginService = module.get<LoginService>(LoginService);
    await authService.create(userDto);
    repository = module.get<UsersRepository>(UsersRepository);
  });
  afterAll(() => {
    module.close();
  });
  it("should be defined", () => {
    expect(loginService).toBeDefined();
  });
  describe("localLogin", () => {
    afterAll(() => repository.delete({}));
    it("1.If Email,Password Match , should return true and user ", async () => {
      const existLoginUserDto: LoginUserDto = {
        email: "test@gmail.com",
        password: "testtest1234!"
      };
      result = await loginService.localLogin(existLoginUserDto);
      expect(result).toEqual({
        status: true,
        data: expect.any(User)
      });
    });
    it("2.If Not Exist Email , should return false and message", async () => {
      const notExistEmailLoginUserDto: LoginUserDto = {
        email: "notexist@gmail.com",
        password: "testest1234!"
      };
      result = await loginService.localLogin(notExistEmailLoginUserDto);
      expect(result).toEqual({
        status: false,
        message: "해당 이메일이 없습니다."
      });
    });
    it("3.If Not Match Password , should return false and message", async () => {
      const notMatchPasswordLoginUserDto: LoginUserDto = {
        email: "test@gmail.com",
        password: "notMatchPassword"
      };
      result = await loginService.localLogin(notMatchPasswordLoginUserDto);
      expect(result).toEqual({
        status: false,
        message: "비밀번호가 일치하지 않습니다."
      });
    });
  });
});
