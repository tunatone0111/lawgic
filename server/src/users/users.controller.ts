import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): string {
    return 'this will return all users';
  }

  @Post()
  postUsers(): string {
    return 'this will post users';
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
