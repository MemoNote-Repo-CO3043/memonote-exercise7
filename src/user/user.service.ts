import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    if (
      await this.prisma.user.findUnique({ where: { username: data.username } })
    ) {
      throw new ConflictException('Username already exists');
    } else if (
      await this.prisma.user.findUnique({ where: { email: data.email } })
    ) {
      throw new ConflictException('Email already exists');
    }
    data.password = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({
      data,
    });
  }

  async findUser(username: string) {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }
  async findOne(username: string) {
    const findUser = await this.prisma.user.findUnique({ where: { username } });
    console.log(username);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return {
      username,
      email: findUser.email,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
    };
  }

  async login(data: { username: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { username: data.username },
    });
    if (user.password === data.password) {
      return {
        username: user.username,
        email: user.email,
      };
    }
    return 'Invalid credentials';
  }

  async logout() {
    return 'Logged out successfully';
  }

  async update(username: string, data: UpdateUserDto) {
    if (!(await this.prisma.user.findUnique({ where: { username } }))) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.update({
      where: { username },
      data,
    });
  }

  async remove(username: string) {
    if (!(await this.prisma.user.findUnique({ where: { username } }))) {
      throw new NotFoundException('User not found');
    }
    return await this.prisma.user.delete({ where: { username } });
  }
}
