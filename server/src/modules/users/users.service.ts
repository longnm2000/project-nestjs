import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createUserService(user: any): Promise<any> {
    try {
      await this.usersRepository.save(user);
      return new HttpException('Created new user', HttpStatus.CREATED);
    } catch (error) {
      return new HttpException('Email already exist', HttpStatus.CONFLICT);
    }
  }

  async getUserByIdService(id: number): Promise<any> {
    try {
      return this.usersRepository.findOne({
        where: {
          id,
        },
        relations: ['posts'],
      });
    } catch (error) {}
  }

  // lấy user theo email
  async getByEmailService(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email,
        },
      });
      if (user) {
        return user;
      }
    } catch (error) {
      throw new HttpException("Can't get user", HttpStatus.BAD_REQUEST);
    }
  }
}
