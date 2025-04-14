import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseData } from 'src/common/utils/response';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const result = await this.categoryRepository.save(createCategoryDto);
    return ResponseData.ok(result);
  }

  async findAll() {
    const result = await this.categoryRepository.find();
    return ResponseData.ok(result);
  }

  async findOne(id: number) {
    const result = await this.categoryRepository.findBy({
      id,
    });
    return ResponseData.ok(result[0]);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.categoryRepository.update(id, updateCategoryDto);

    if (result.affected === 0) {
      return ResponseData.fail(400, '修改失败, 该数据不存在');
    }

    return ResponseData.ok();
  }

  async remove(id: number) {
    const result = await this.categoryRepository.delete({
      id,
    });

    if (result.affected === 0) {
      return ResponseData.fail(400, '删除失败, 改数据不存在');
    }

    return ResponseData.ok();
  }
}
