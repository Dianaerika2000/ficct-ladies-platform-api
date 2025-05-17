import { Injectable, UnauthorizedException} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';
import { SigninUserDto } from './dto/singin-user.dto';
import { SingupUserDto } from './dto/singup-user.dto';
import { JWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async signIn(signinUserDto: SigninUserDto){
    const { email, password } = signinUserDto;
    
    const user = await this.userService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const jwt = this.generateJwt({ email: user.email })

    return {
      ...user,
      access_token: jwt,
    }
  }

  private generateJwt(payload: JWTPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
