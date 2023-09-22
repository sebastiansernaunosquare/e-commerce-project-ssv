import { IUser } from "@src/domain/models/User";
import { IUserRepository } from "@src/domain/repositories/UserRepository";
import { UseCase } from "@src/domain/UseCase";

export class CreateUserUseCase implements UseCase<IUser | undefined, IUser> {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute(user: IUser | undefined): Promise<IUser> {
    if (typeof user === "undefined") {
      return Promise.reject(new Error("Not provided user"));
    }
    return this.userRepository.create(user);
  }
}
