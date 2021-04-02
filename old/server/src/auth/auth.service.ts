import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      // sign() to generate JWT
      access_token: this.jwtService.sign(payload),
      likedPrecs: user.likedPrecs.map(l => l.objId.toString()),
    };
  }
}
