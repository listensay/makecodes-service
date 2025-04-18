import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/common/utils/bcryptjs';
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

  async findAll() {
    const users = await this.user.find();
    // 过滤掉密码字段
    const safeUsers = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    });
    return ResponseData.ok(safeUsers);
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
}
