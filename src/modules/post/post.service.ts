import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository, PostRepositoryToken } from './repository';

@Injectable()
export class PostService {
  constructor(
    @Inject(PostRepositoryToken)
    private readonly postRepository: PostRepository,
  ) {}

  async getPost(id: string) {
    return this.postRepository.getPost(id);
  }

  async createPost(data: CreatePostDto) {
    return this.postRepository.createPost(data);
  }

  async updatePost(id: string, data: UpdatePostDto) {
    return this.postRepository.updatePost(id, data);
  }

  async deletePost(id: string) {
    return this.postRepository.deletePost(id);
  }
}
