import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/guards/role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { UpdatePasswordDto, UpdateUserDto } from './dto/user.dto';
import { AtGuard } from 'src/guards/at.guard';
import { FormDataRequest } from 'nestjs-form-data';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  // @UseGuards(AtGuard, RoleGuard)
  // @Roles('author','admin')
  @Get()
  async getAll() {
    return await this.usersService.findAll();
  }

  // @UseGuards(AtGuard)
  // @UseGuards(RoleGuard)
  // @Roles('admin','author')
  @Patch(':id')
  @FormDataRequest()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) new HttpException('Failed to update user data', 500);
    const { userId, firstName, lastName, email, roles } = user;
    return { userId, firstName, lastName, email, roles };
  }

  // @UseGuards(AtGuard)
  @Patch('updatePassword/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.usersService.updatePassword(id, updatePasswordDto);
  }

  // @UseGuards(AtGuard)
  // @UseGuards(RoleGuard)
  // @Roles('admin','author')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (id.trim() === 'undefined' || '') throw new ForbiddenException();
    const user = await this.usersService.findOne(id);
    if (!user) throw new HttpException('User not found', 400);
    return user;
  }

  // @UseGuards(AtGuard)
  // @UseGuards(RoleGuard)
  // @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // @UseGuards(AtGuard)
  // @UseGuards(RoleGuard)
  // @Roles('admin','author')
  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    const user = this.usersService.findByEmail(email);
    if (!user) throw new HttpException('User not found', 400);
    return user;
  }
}
