import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Public } from 'src/common/public.decorator';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Public()
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  // @Public()
  @Get()
  findAll() {
    return this.roleService.findAll();
  }
  // @Public()
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.roleService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(name, updateRoleDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.roleService.remove(name);
  }
}
