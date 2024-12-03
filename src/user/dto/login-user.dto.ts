import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'The username of the User',
    type: String,
    example: 'string',
  })
  username: string;

  @ApiProperty({
    description: 'The password of the User',
    type: String,
    example: 'string',
  })
  password: string;
}
