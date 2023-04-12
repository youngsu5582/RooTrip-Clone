import { CustomRepository } from '../../config/typeorm/custom-typeorm.decorator';
import { Repository } from 'typeorm';
import User from '../tables/user.entity';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {}