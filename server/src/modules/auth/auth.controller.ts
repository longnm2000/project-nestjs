import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/registerUser.dto';
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerData: RegisterUserDTO) {
    return this.authService.register(registerData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginBody: LoginDto) {
    return this.authService.login(loginBody);
  }
}
