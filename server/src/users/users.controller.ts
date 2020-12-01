import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  getUsers(): string {
    return 'return my info';
  }

  @Post('/register')
  async register(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersService.createOne(newUser);
  }

  @Put()
  putUsers(): string {
    return 'this will put users';
  }

  @Delete()
  deleteUsers(): string {
    return 'this will delete users';
  }
}
