import { ApiProperty } from '@nestjs/swagger';
import { NoteInput } from './create-note.dto';

export class CreateVideoDto {
  @ApiProperty({
    description: 'The id of the User',
    type: String,
    example: 'string',
  })
  userId: string;

  @ApiProperty({
    description: 'The title of the Video',
    type: String,
    example: 'string',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the Video',
    type: String,
    example: 'string',
  })
  description: string;

  @ApiProperty({
    description: 'The subject of the Video',
    type: String,
    example: 'string',
  })
  subject: string;

  @ApiProperty({
    type: [NoteInput],
    description: 'The notes of the Video',
    example: [{ timestamp: 'string', note: 'string' }],
  })
  notes: NoteInput[];
}
