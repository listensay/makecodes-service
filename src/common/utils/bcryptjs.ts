import * as bcrypt from 'bcryptjs';

/**
 * 加密密码
 * @param password 密码
 * @returns 加密后的密码
 */
const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

/**
 * 验证密码
 * @param password 密码
 * @param encryptPassword 加密后的密码
 * @returns 是否验证成功
 */
const isOk = (password: string, encryptPassword: string): boolean => {
  return bcrypt.compareSync(password, encryptPassword);
};

export { hashPassword, isOk };
