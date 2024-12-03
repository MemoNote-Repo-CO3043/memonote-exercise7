import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user1',
    description: 'The name of the User',
  })
  username: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the User',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the User',
  })
  lastName: string;

  @ApiProperty({
    example: 'string@gmail.com',
    description: 'The email of the User',
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the User',
  })
  password: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the User',
  })
  phone: string;

  @ApiProperty({
    example: 1,
    description: 'The status of the User',
  })
  userStatus: number;
}
