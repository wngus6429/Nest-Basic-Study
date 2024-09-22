import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터가 없는 속성은 제거
      forbidNonWhitelisted: true, // 데코레이터가 없는 속성이 있으면 요청 자체를 막음
      transform: true, // 요청에서 넘어온 자료들의 자동 형변환 미쳤따리
    }),
  );
  await app.listen(3000);
}
bootstrap();
