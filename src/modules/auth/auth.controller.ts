import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// 定义请求类型
interface LoginDto {
  username: string;
  password: string;
}

// 定义用户请求类型
interface RequestWithUser extends Request {
  user: {
    userId: number;
    username: string;
  };
}

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '用户登录',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @ApiOperation({
    summary: '获取当前登录用户信息',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return this.authService.getUserProfile(req.user.username);
  }
}
