import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Admin } from './entity/admins.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
  ) {}

  // lấy admin theo email
  async getByEmailService(email: string) {
    try {
      const admin = await this.adminsRepository.findOne({
        where: {
          email,
        },
      });

      if (admin) {
        return admin;
      }
    } catch (error) {
      throw new HttpException("Can't get admin", HttpStatus.BAD_REQUEST);
    }
  }
}
