import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: any) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    try {
      return await this.userService.createUserService({
        ...registerData,
        password: hashedPassword,
      });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(infoUser: LoginDto): Promise<any> {
    try {
      const user = await this.userService.getByEmailService(infoUser.email);

      if (!user) {
        return new HttpException('Email Not Found', HttpStatus.NOT_FOUND);
      }
      const isMatch = await bcrypt.compare(infoUser.password, user.password);
      if (!isMatch) {
        return new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      }
      const token = await this.createToken(user);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return {
        status: 200,
        user: rest,
        access_token: token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
  }

  async createToken(user: any): Promise<any> {
    const payload = {
      email: user.email,
      sub: user.id.toString(),
    };
    return await this.jwtService.signAsync(payload);
  }
}
