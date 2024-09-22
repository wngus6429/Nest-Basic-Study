import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDTO } from './create-movie.dto';

// DTO는 데이터 전송 객체로 데이터베이스와 통신할 때 사용
// 들어오는 쿼리에 대해 DTO가 검증을 해준다.
// "class-transformer": "^0.5.1", "class-validator": "^0.14.1",
// 이것들로 DTO를 검증할 수 있다.
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {
  @IsString()
  readonly title?: string;

  @IsNumber()
  readonly year?: number;

  @IsString({ each: true })
  readonly genres?: string[];
}
