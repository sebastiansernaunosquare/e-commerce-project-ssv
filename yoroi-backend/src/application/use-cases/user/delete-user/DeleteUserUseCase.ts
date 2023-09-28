import { IUser } from "@src/domain/models/User";
import { IUserRepository } from "@src/domain/repositories/UserRepository";
import { UseCase } from "@src/domain/UseCase";

export class DeleteUserUseCase
  implements UseCase<string | undefined, IUser | boolean>
{
  private userRepository: IUserRepository;
  public constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public execute(email: string | undefined): Promise<IUser | boolean> {
    if (typeof email === "undefined") {
      return Promise.reject(new Error("Not provided email"));
    }
    return this.userRepository.delete(email);
  }
}
