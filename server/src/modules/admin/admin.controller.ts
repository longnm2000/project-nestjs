import { AdminsService } from './admin.service';
import { Controller } from '@nestjs/common';

@Controller('/api/v1/users')
export class AdminsController {
  constructor(private readonly adminService: AdminsService) {}
}
