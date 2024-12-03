import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVideoDto } from './create-video.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @ApiProperty({
    example: 'string',
    description: 'The title of the Video',
  })
  title: string;

  @ApiProperty({
    example: 'string',
    description: 'The description of the Video',
  })
  description: string;

  @ApiProperty({
    example: 'string',
    description: 'The subject of the Video',
  })
  subject: string;
}
