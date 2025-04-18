# Makcode-Serves

这是一个基于NestJS框架的后端API服务，提供用户认证、分类管理等功能。

## 功能特性

- 用户注册与登录
- JWT身份认证
- 用户信息管理
- 分类管理

## 技术栈

- NestJS - 后端框架
- TypeORM - 数据库ORM
- MySQL - 数据库
- JWT - 身份认证
- Passport - 认证中间件
- bcryptjs - 密码加密

## 开发环境设置

1. 安装依赖：

```bash
npm install
```

2. 创建`.development.env`文件并配置数据库连接参数：

```
DB_NAME=用户名
DB_PASSWORD=密码
DB_HOST=localhost
DB_PROT=3306
DB_DATABASE=数据库名
```

3. 启动开发服务器：

```bash
npm run start:dev
```

## API接口说明

### 认证相关

#### 注册用户

- **URL**: `/user/register`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "username": "用户名",
    "password": "密码"
  }
  ```
- **成功响应**:
  ```json
  {
    "code": 200,
    "msg": "操作成功",
    "data": null
  }
  ```

#### 用户登录

- **URL**: `/auth/login`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "username": "用户名",
    "password": "密码"
  }
  ```
- **成功响应**:
  ```json
  {
    "code": 200,
    "msg": "操作成功",
    "data": {
      "id": 1,
      "username": "用户名",
      "avatar": "头像URL",
      "token": "JWT令牌"
    }
  }
  ```

#### 获取当前用户信息

- **URL**: `/auth/profile`
- **方法**: `GET`
- **请求头**:
  ```
  Authorization: Bearer JWT令牌
  ```
- **成功响应**:
  ```json
  {
    "code": 200,
    "msg": "操作成功",
    "data": {
      "userId": 1,
      "username": "用户名"
    }
  }
  ```

### 用户管理

#### 获取所有用户

- **URL**: `/user`
- **方法**: `GET`
- **请求头**:
  ```
  Authorization: Bearer JWT令牌
  ```
- **成功响应**:
  ```json
  {
    "code": 200,
    "msg": "操作成功",
    "data": [
      {
        "id": 1,
        "username": "用户名",
        "avatar": "头像URL"
      }
    ]
  }
  ```

#### 获取指定用户信息

- **URL**: `/user/:username`
- **方法**: `GET`
- **请求头**:
  ```
  Authorization: Bearer JWT令牌
  ```
- **成功响应**:
  ```json
  {
    "code": 200,
    "msg": "操作成功",
    "data": {
      "id": 1,
      "username": "用户名",
      "avatar": "头像URL"
    }
  }
  ```

## JWT认证说明

本项目使用JWT（JSON Web Token）进行身份认证，工作流程如下：

1. 用户通过`/auth/login`接口登录，服务器验证用户名和密码
2. 验证通过后，服务器生成JWT令牌并返回给客户端
3. 客户端将JWT令牌保存在本地（如localStorage）
4. 客户端在后续请求中，在请求头中加入`Authorization: Bearer {token}`
5. 服务器验证JWT令牌的有效性，并从中提取用户信息
6. 如果令牌有效，允许访问受保护的资源；否则，返回401未授权错误

JWT令牌有效期为24小时，过期后需要重新登录获取新的令牌。

## 开发注意事项

1. JWT密钥在生产环境中应当使用环境变量存储，不应硬编码在代码中
2. 密码存储使用bcryptjs进行加密，确保安全性
3. 所有受保护的API接口都应使用`@UseGuards(JwtAuthGuard)`装饰器进行保护
