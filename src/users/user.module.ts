import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/user.repository';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/user-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [],
})
export class UserModule {}
