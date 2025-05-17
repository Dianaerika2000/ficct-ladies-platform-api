import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingupUserDto } from './dto/singup-user.dto';
import { SigninUserDto } from './dto/singin-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Successful login, returns JWT token or user session.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, invalid credentials.' })
  signIn(@Body() signinUserDto: SigninUserDto){
    return this.authService.signIn(signinUserDto);
  }
}
