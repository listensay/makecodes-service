import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword, isOk } from 'src/common/utils/bcryptjs';
import { ResponseData } from 'src/common/utils/response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const user = await this.findOne(username);

    if (user) {
      return ResponseData.fail(400, '用户已存在');
    }

    const encryptPassword = hashPassword(password);

    await this.user.save({
      username,
      avatar: 'default-avatar.png',
      password: encryptPassword,
    });

    return ResponseData.ok();
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string) {
    const result = await this.user.findOne({
      where: { username },
    });
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(user: CreateUserDto) {
    const { username, password } = user;

    const userInfo = await this.findOne(username);

    if (!userInfo) {
      return ResponseData.fail(400, '用户不存在');
    }
    const isPasswordValid = isOk(password, userInfo.password);

    if (!isPasswordValid) {
      return ResponseData.fail(400, '密码错误');
    }

    return ResponseData.ok();
  }
}
