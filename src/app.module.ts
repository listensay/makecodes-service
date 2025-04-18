import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TemplateModule } from './modules/template/template.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PROT),
      database: process.env.DB_DATABASE,
      // 自动根据实体类字段生成数据库字段
      synchronize: true,
      // 自动加载实体类
      autoLoadEntities: true,
      // 数据库时区
      timezone: 'Z',
    }),
    CategoryModule,
    UserModule,
    AuthModule,
    TemplateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
