import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async readOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    const isExist = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();
    if (isExist) {
      throw new BadRequestException('Username already exists');
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateOne(updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.updateOne(
      { username: updateUserDto.username as string },
      { likedPrecs: updateUserDto.likedPrecs },
    );
  }
}
