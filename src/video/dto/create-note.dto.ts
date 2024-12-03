import { ApiBody, ApiProperty } from '@nestjs/swagger';

export class NoteInput {
  @ApiProperty({
    description: 'The timestamp of the Note',
    type: String,
    example: 'string',
  })
  timestamp: string;

  @ApiProperty({
    description: 'The note of the Note',
    type: String,
    example: 'string',
  })
  note: string;
}
