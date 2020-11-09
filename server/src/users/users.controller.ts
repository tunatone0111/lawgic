import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('api/users')
export class UsersController {
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
