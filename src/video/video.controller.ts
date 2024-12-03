import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { isUUID } from 'class-validator';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @ApiOperation({
    summary: 'Add a new video',
    description: 'Adds a new video entry and associates it with a user.',
  })
  @ApiResponse({
    status: 201,
    description: 'The video has been successfully created.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            videoId: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            subject: {
              type: 'string',
            },
            notes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  videoId: {
                    type: 'string',
                  },
                  timestamp: {
                    type: 'string',
                  },
                  note: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, possibly due to an invalid data.',
  })
  @ApiResponse({ status: 404, description: 'User or video not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    try {
      if (!isUUID(createVideoDto.userId)) {
        throw new BadRequestException(
          'Bad request, possibly due to an invalid user ID.',
        );
      }
      return this.videoService.create(createVideoDto);
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            status: e.getStatus(),
            error: e.message,
          },
          e.getStatus(),
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal server error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiOperation({
    summary: 'Retrieves all videos for a specific user',
    description:
      'Returns a list of all videos for a specified user (student) based on their user ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of videos for the specified user.',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              videoId: {
                type: 'string',
              },
              userId: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              subject: {
                type: 'string',
              },
              notes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                    videoId: {
                      type: 'string',
                    },
                    timestamp: {
                      type: 'string',
                    },
                    note: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, possibly due to an invalid user ID.',
  })
  @ApiResponse({ status: 404, description: 'User or videos not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiQuery({
    name: 'userId',
    type: String,
    required: true,
    description: 'The ID of the user to retrieve videos for.',
  })
  @Get()
  findAll(@Query('userId') userId: string) {
    return this.videoService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Retrieve a specific video by ID',
    description: 'Returns details of a specific video based on the video ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the specified video.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            videoId: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            subject: {
              type: 'string',
            },
            notes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  videoId: {
                    type: 'string',
                  },
                  timestamp: {
                    type: 'string',
                  },
                  note: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, possibly due to an invalid ID.',
  })
  @ApiResponse({ status: 404, description: 'Video not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'videoId',
    type: String,
    required: true,
    description: 'The ID of the video to retrieve.',
  })
  @Get('/:videoId')
  findOne(@Param('videoId') videoId: string) {
    try {
      if (!isUUID(videoId)) {
        throw new BadRequestException(
          'Bad request, possibly due to an invalid ID.',
        );
      }
      return this.videoService.findOne(videoId);
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            status: e.getStatus(),
            error: e.message,
          },
          e.getStatus(),
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal server error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  @ApiOperation({
    summary: 'Delete a specific video by ID',
    description: 'Deletes a specific video based on the video ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'Video deleted successfully, no content in response.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, possibly due to an invalid ID format.',
  })
  @ApiResponse({ status: 404, description: 'Video not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'videoId',
    type: String,
    required: true,
    description: 'The ID of the video to delete.',
  })
  @Delete('/:videoId')
  remove(@Param('videoId') videoId: string) {
    try {
      if (!isUUID(videoId)) {
        throw new BadRequestException(
          'Bad request, possibly due to an invalid ID format.',
        );
      }
      return this.videoService.remove(videoId);
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            status: e.getStatus(),
            error: e.message,
          },
          e.getStatus(),
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal server error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
