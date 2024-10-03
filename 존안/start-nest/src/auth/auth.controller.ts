import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ValidationPipe 없으면 auth-credentialDto에서 정의한 유효성 검사가 적용되지 않음
  @Post('/signup')
  signUp(@Body(ValidationPipe) userData: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(userData);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) userData: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userData);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Res() req) {
    console.log(req);
  }
}
