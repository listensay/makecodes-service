import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly categoryId: number;
}
