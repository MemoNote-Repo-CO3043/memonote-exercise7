import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVideoDto: CreateVideoDto) {
    if (
      (await this.prisma.user.findUnique({
        where: { id: createVideoDto.userId },
      })) === null
    ) {
      throw new NotFoundException('User not found');
    }
    const video = await this.prisma.video.create({
      data: {
        videoId: randomUUID(),
        userId: createVideoDto.userId,
        title: createVideoDto.title,
        description: createVideoDto.description,
        subject: createVideoDto.subject,
      },
    });
    const notes = [];
    for (let note of createVideoDto.notes) {
      notes.push({
        id: randomUUID(),
        videoId: video.videoId,
        timestamp: note.timestamp,
        note: note.note,
      });
    }
    await this.prisma.note.createMany({
      data: notes,
    });
    return await this.prisma.video.update({
      where: {
        videoId: video.videoId,
      },
      data: {
        notes: {
          connect: notes.map((note) => {
            return {
              id: note.id,
            };
          }),
        },
      },
    });
  }

  async findAll(userId: string) {
    if (parseInt(userId) === undefined) return;
    return await this.prisma.video.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async findOne(videoId: string) {
    return await this.prisma.video.findFirst({
      where: {
        videoId,
      },
    });
  }

  async remove(videoId: string) {
    if ((await this.prisma.video.findFirst({ where: { videoId } })) === null) {
      throw new NotFoundException('Video not found');
    }

    return await this.prisma.video.delete({
      where: {
        videoId,
      },
    });
  }
}
