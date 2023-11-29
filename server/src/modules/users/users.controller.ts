import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '../../enums/role.enum';
import { Roles } from '../../decorators/role.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { ChangeStatusDto } from './dto/changeStatus.dto';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserByIdService(Number(id));
  }
  @Get()
  getAllUsers() {
    return this.usersService.getAllUser();
  }
  @Patch('/:id')
  changeStatus(@Param('id') id: string, @Body() active: ChangeStatusDto) {
    return this.usersService.changeUserStatus(+id, active.active);
  }
}
