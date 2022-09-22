import { Module, Provider } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepositoryImplement, PostRepositoryToken } from './repository';

const repository: Provider[] = [
  {
    provide: PostRepositoryToken,
    useClass: PostRepositoryImplement,
  },
];

const services = [PostService];

@Module({
  controllers: [PostController],
  providers: [...repository, ...services],
})
export class PostModule {}
