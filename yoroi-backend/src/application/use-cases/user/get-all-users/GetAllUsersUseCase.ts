import { IUser } from "@src/domain/models/User";
import { IUserRepository } from "@src/domain/repositories/UserRepository";
import { UseCase } from "@src/domain/UseCase";

export class GetAllUsersUseCase implements UseCase<unknown, IUser[]> {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute(): Promise<IUser[]> {
    return Promise.resolve(this.userRepository.getAll());
  }
}
