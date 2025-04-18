import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('模板')
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @ApiOperation({ summary: '创建模板' })
  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @ApiOperation({ summary: '获取所有模板' })
  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  @ApiOperation({ summary: '获取单个模板' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateService.findOne(+id);
  }

  @ApiOperation({ summary: '更新模板' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templateService.update(+id, updateTemplateDto);
  }

  @ApiOperation({ summary: '删除模板' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateService.remove(+id);
  }
}
