import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from '../utils/response';

interface ExceptionResponseObject {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 处理权限验证失败的情况
    if (exception instanceof UnauthorizedException) {
      return response
        .status(status)
        .json(ResponseData.fail(401, '权限验证失败，请重新登录', null));
    }

    // 处理其他异常
    let message = 'Internal server error';
    if (typeof exceptionResponse === 'object') {
      const typedResponse = exceptionResponse as ExceptionResponseObject;
      message = typedResponse.message?.toString() || exception.message;
    } else if (typeof exceptionResponse === 'string') {
      message = exceptionResponse || exception.message;
    }

    return response
      .status(status)
      .json(ResponseData.fail(status, message, null));
  }
}
