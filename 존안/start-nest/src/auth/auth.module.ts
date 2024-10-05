import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn, // 1시간 토큰 유용하게
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  // JwtStrategy를 이 AuthModule에서 사용할 수 있게 해줌
  providers: [AuthService, JwtStrategy],
  // JwtStrategy, PassportModule를 다른곳에서 사용할 수 있게 해줌
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
