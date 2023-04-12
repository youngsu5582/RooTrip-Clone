import User from '../tables/user.entity';

export type CreateUserDto = Pick<
  User,
  'email'|'name' | 'nickname' |'password' |'gender'
>;