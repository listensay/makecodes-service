import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '123456',
      host: 'localhost',
      port: 3306,
      database: 'makecodes',
      // 自动根据实体类字段生成数据库字段
      synchronize: true,
      // 自动加载实体类
      autoLoadEntities: true,
      // 数据库时区
      timezone: 'Z',
    }),
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
