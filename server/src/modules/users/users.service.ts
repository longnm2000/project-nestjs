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
    } catch (error) {
      throw new HttpException("Can't get user", HttpStatus.BAD_REQUEST);
    }
  }

  async findUserByIdService(id: number): Promise<any> {
    console.log(id);

    try {
      return this.usersRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException("Can't get user", HttpStatus.BAD_REQUEST);
    }
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
  async getAllUser() {
    try {
      const users = await this.usersRepository.find();
      if (users) {
        return users;
      }
    } catch (error) {
      throw new HttpException("Can't get user", HttpStatus.BAD_REQUEST);
    }
  }
  async changeUserStatus(userId: number, newStatus: number): Promise<any> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new Error('User not found');
      }

      await this.usersRepository
        .createQueryBuilder()
        .update(Users)
        .set({ active: newStatus })
        .where('id = :id', { id: userId })
        .execute();
      return new HttpException(
        'Update status for this user success',
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(
        "Can't update status for this user",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
