import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

export const PostRepositoryToken = 'PostRepositoryToken' as const;

export interface PostRepository {
  getPost(id: string): Promise<PostModel>;
  createPost(data: CreatePostDto): Promise<void>;
  updatePost(id: string, data: UpdatePostDto): Promise<void>;
  deletePost(id: string): Promise<void>;
}

@Injectable()
export class PostRepositoryImplement implements PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getPost(id: string): Promise<PostModel> {
    const post = await this.prisma.post.findUniqueOrThrow({
      where: { id },
    });

    return post;
  }

  async createPost(data: CreatePostDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) throw new NotFoundException('사용자가 존재하지 않습니다.');

    await this.prisma.post.create({
      data: {
        id: new Date().toString(),
        thumbnailUrl: '123',
        title: data.title,
        updatedAt: new Date(),
        content: data?.content,
        User: {
          connect: {
            id: data?.userId,
          },
        },
      },
    });
  }

  async updatePost(id: string, data: UpdatePostDto): Promise<void> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) throw new NotFoundException('존재하지 않는 게시물입니다.');

    await this.prisma.post.update({
      where: { id },
      data: {
        title: data?.title,
        content: data?.content,
      },
    });
  }

  async deletePost(id: string): Promise<void> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) throw new NotFoundException('존재하지 않는 게시물입니다.');

    await this.prisma.post.delete({
      where: { id },
    });
  }
}
