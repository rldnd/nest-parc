import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('[POST] 게시물')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Post()
  async createPost(@Body() data: CreatePostDto) {
    return this.postService.createPost(data);
  }

  @Patch(':id')
  async udpatePost(@Param('id') id: string, data: UpdatePostDto) {
    return this.postService.updatePost(id, data);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
