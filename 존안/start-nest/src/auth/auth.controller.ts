import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ValidationPipe 없으면 auth-credentialDto에서 정의한 유효성 검사가 적용되지 않음
  @Post('/signup')
  signUp(@Body(ValidationPipe) userData: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(userData);
  }
}
