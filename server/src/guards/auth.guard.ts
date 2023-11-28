import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../modules/users/entity/users.entity';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      let token: string;

      if (
        request.headers.authorization ||
        request.headers.authorization.startsWith('Bearer')
      ) {
        token = request.headers.authorization.split(' ')[1];
      }
      if (!token) {
        throw new HttpException(
          {
            message: 'bạn chưa login, làm ơn login',
            status: 401,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload = await this.jwtService.verifyAsync(token);
      const currentUser = await this.userRepository.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!currentUser) {
        throw new HttpException(
          { message: 'This User is not exists', status: 'unauthorized' },
          HttpStatus.NOT_FOUND,
        );
      }

      request['user'] = currentUser;

      // đoạn này là check role xem là admin hay là user

      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }

      return requiredRoles.some((role) => request['user'].role === role);
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          status: error.status,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
