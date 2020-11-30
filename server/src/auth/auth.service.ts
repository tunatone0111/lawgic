import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<Partial<User>> {
    const user = await this.usersService.readOne(username);
    if (user && user.password === pass) {
      return {
        username: user.username,
        isAdmin: user.isAdmin,
        likedPrecs: user.likedPrecs,
      };
    }
    return null;
  }
}
