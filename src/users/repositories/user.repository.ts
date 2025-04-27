import { InjectRepository } from '@nestjs/typeorm';
import { UsersType } from '../type-user';
import { Injectable } from '@nestjs/common';
import { Users } from '../entity/user-entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(user: UsersType): Promise<UsersType> {
    const newUser = this.userRepository.create(user);
    const createUser = await this.userRepository.save(newUser);

    return {
      id: createUser.id,
      name: createUser.name,
      email: createUser.email
    };
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async update(id: number, data: Partial<UsersType>): Promise<Users | null> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) return null;

    Object.assign(user, data);
    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete({ id: id });
  }
}
