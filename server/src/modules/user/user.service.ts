import { UsersRepository } from '@repositories/users/users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) { }

  getUserById(userId: string) {
    return this.usersRepository.getOneById(userId)
  }


}
