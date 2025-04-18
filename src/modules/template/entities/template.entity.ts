import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

Entity();
export class Template {
  @PrimaryGeneratedColumn({
    comment: '主键',
  })
  id: number;

  @Column({
    comment: '模板名称',
  })
  name: string;

  @Column({
    comment: '模板分类',
  })
  categoryId: number;

  @Column({
    comment: '模板描述',
  })
  description: string;

  @Column({
    comment: '模板内容',
  })
  content: string;

  @Column({
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    comment: '创建者',
  })
  createdBy: string;

  @Column({
    comment: '更新者',
  })
  updatedBy: string;

  @Column({
    comment: '是否删除',
    default: 0,
  })
  isDelete: number;
}
