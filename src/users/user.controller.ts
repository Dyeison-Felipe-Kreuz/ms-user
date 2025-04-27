import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been succesSfullY created'
  })
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.usersService.delete(id);
  }
}
