import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class AuthCredentialDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[A-Za-z0-9]*$/, {
    message: 'Password can only contain letters and numbers',
  })
  password: string;
}
