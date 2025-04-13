import { ApiProperty } from '@nestjs/swagger';

export const SUCCESS_CODE = 200;

/**
 * 响应结构
 * ok 成功
 * fail 失败
 */
export class ResponseData {
  constructor(code = SUCCESS_CODE, msg?: string, data?: unknown) {
    this.code = code;
    this.msg = msg || '操作成功';
    this.data = data || null;
  }

  @ApiProperty({ type: 'number', default: SUCCESS_CODE })
  code: number;

  @ApiProperty({ type: 'string', default: '操作成功' })
  msg?: string;

  data?: unknown;

  static ok(data?: any, msg?: string): ResponseData {
    return new ResponseData(SUCCESS_CODE, msg, data);
  }

  static fail(code: number, msg?: string, data?: any): ResponseData {
    return new ResponseData(code || 500, msg || 'fail', data);
  }
}
