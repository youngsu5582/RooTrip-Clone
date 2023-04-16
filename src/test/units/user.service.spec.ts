import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/tables/user.entity';;
import { TypeOrmMoudleOptions } from 'src/database/typeorm';
import { UserService } from 'src/providers/user.service';
import { UserModule } from 'src/module/user.module';
import { CreateUserDto } from 'src/models/dtos/create-user-dto';
import { typeormConfig } from 'src/config';

describe('User Service',()=>{
  let service : UserService;
  let module :TestingModule;
  beforeAll(async()=>{
    module = await Test.createTestingModule({
      imports:[
        TypeOrmModule.forRootAsync(TypeOrmMoudleOptions),
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot({
          load:[typeormConfig],
          isGlobal:true}),
        UserModule,
      ],
      controllers:[],
      providers:[],
    }).compile();
    service = module.get<UserService>(UserService);
  })
  
  describe('0. Setting',()=>{
    it('Controller , Service ',async ()=>{
      expect(service).toBeDefined();
    })
  });
  describe('1. Create', ()=>{
    it('1-1 Create Complete',async()=>{
    const userDto : CreateUserDto={
      email:'test@gmail.com',
      gender:'m',
      name:'test',
      nickname:'testnickname',
      password:'testest1234!',
      phoneNumber:'01055825894'
    }
    const result = await service.create(userDto);
    expect(result).toEqual({
      status: true,
      message: "회원가입 성공"
    })
  })
  it('1-2 Duplicate Email should be return error',async ()=>{
    const DuplicatedEmialDto : CreateUserDto={
      email:'test1234@gmail.com',
      gender:'m',
      name:'test',
      nickname:'testnickname',
      password:'testest1234!',
      phoneNumber:'01012345678'
    };
    await service.create(DuplicatedEmialDto);
    DuplicatedEmialDto.phoneNumber='01056781234';
    const result = await service.create(DuplicatedEmialDto);
    expect(result).toEqual({
      status: true,
      message: "중복된 이메일이 있습니다."
    })
  })
})})