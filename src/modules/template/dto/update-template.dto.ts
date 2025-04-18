import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateDto } from './create-template.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly categoryId: number;
}
