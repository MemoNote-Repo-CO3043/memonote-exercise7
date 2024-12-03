import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The first name of the User',
    type: String,
    example: 'string',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the User',
    type: String,
    example: 'string',
  })
  lastName: string;

  @ApiProperty({
    description: 'The email of the User',
    type: String,
    example: 'string',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    type: String,
    example: 'string',
  })
  password: string;

  @ApiProperty({
    description: 'The phone number of the User',
    type: String,
    example: 'string',
  })
  phone: string;
}
