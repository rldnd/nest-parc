import { PostModule } from '@/modules/post/post.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './modules/global.module';

@Module({
  imports: [
    GlobalModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
