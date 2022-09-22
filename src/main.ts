import { PrismaService } from '@/database/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NotFoundInterceptor } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.useGlobalInterceptors(new NotFoundInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      // NOTE: 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
      whitelist: true,
      // NOTE: 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
      forbidNonWhitelisted: true,
      // NOTE: 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('POME-NEST')
    .setDescription('기웅씨가 직접 짜보는 서버')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
