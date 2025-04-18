import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// 定义JWT载荷的接口
interface JwtPayload {
  sub: number;
  username: string;
  [key: string]: any;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'makcode_secret_key',
    });
  }

  // JWT验证通过后解析的用户信息会传递到这里
  validate(payload: JwtPayload) {
    // payload是我们之前在JWT中存储的信息（例如用户ID、用户名等）
    // 这里返回的对象将被添加到请求对象中，可以在控制器中使用@Request()装饰器获取
    return { userId: payload.sub, username: payload.username };
  }
}
