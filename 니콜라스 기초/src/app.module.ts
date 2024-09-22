import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

// 데코레이터를 사용하여 AppModule 클래스를 정의
// 데코레이터는 클래스에 함수 기능을 추가할 수 있도록 해준다.
@Module({
  imports: [MoviesModule],
  controllers: [AppController], // URL을 가져오고 함수를 실행하는 역할, express의 라우터와 비슷
  providers: [],
  // controllers: [MoviesController], // URL을 가져오고 함수를 실행하는 역할, express의 라우터와 비슷
  // providers: [MoviesService],
})
// 서비스가 필요한 이유는 NestJS의 컨트롤러는 비즈니스 로직이랑 구분 짓기 위해서
// 컨트롤러는 그냥 URL을 가져오는 역할일뿐 그리고 간단한 함수
// 요청을 받아서 서비스에게 전달하고 서비스는 비즈니스 로직을 처리한다.
export class AppModule {}
