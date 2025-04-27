import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/user.repository';
import { UsersType } from './type-user';
import { PubSubService } from 'src/global/pubsub/punsub.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly pubSubService: PubSubService,
  ) {}

  async create(user: UsersType) {
    const userCreated = await this.repository.create(user);
    this.pubSubService.publish('user-created', userCreated, 'users');
    return userCreated;
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async update(id: number, data: UsersType) {
    return await this.repository.update(id, data);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
