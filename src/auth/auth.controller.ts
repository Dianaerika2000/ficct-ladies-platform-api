import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingupUserDto } from './dto/singup-user.dto';
import { SigninUserDto } from './dto/singin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('register')
  // signUp(@Body() singupUserDto: SingupUserDto){
  //   return this.authService.signUp(singupUserDto);
  // }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signinUserDto: SigninUserDto){
    return this.authService.signIn(signinUserDto);
  }
}
