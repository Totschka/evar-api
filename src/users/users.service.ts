import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(user_id: string) {
    return this.userModel.findOne({ user_id: user_id });
  }

  update(user_id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ user_id: user_id }, updateUserDto);
  }

  remove(user_id: string) {
    return this.userModel.findOneAndDelete({ user_id: user_id });
  }
}
