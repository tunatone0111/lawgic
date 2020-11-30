import { User } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  auth(): User {
    return {
      username: 'test user',
      password: 'test pwd',
      isAdmin: false,
      likedPrecs: [],
    };
  }
}
