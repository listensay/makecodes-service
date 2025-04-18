import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { isOk } from 'src/common/utils/bcryptjs';
import { ResponseData } from 'src/common/utils/response';
import { User } from '../user/entities/user.entity';

interface UserPayload {
  username: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * 用户登录并生成JWT令牌
   * @param username 用户名
   * @param password 密码
   */
  async login(username: string, password: string): Promise<ResponseData> {
    // 查找用户
    const user = await this.userService.findOne(username);

    // 用户不存在
    if (!user) {
      return ResponseData.fail(400, '用户不存在');
    }

    // 验证密码
    const isPasswordValid = isOk(password, user.password);
    if (!isPasswordValid) {
      return ResponseData.fail(400, '密码错误');
    }

    // 生成JWT令牌
    const payload: UserPayload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    // 返回用户信息和令牌
    return ResponseData.ok({
      token,
    });
  }

  /**
   * 验证用户信息
   * @param username 用户名
   * @param password 密码
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findOne(username);
    if (user && isOk(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async getUserProfile(username: string) {
    console.log(username);

    const user = await this.userService.findOne(username);
    if (!user) {
      return ResponseData.fail(400, '用户不存在');
    }
    return ResponseData.ok(user);
  }
}
