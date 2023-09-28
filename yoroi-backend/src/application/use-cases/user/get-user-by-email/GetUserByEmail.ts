import { IUser } from "@src/domain/models/User";
import { IUserRepository } from "@src/domain/repositories/UserRepository";
import { UseCase } from "@src/domain/UseCase";

export class GetUserByEmailUseCase
  implements UseCase<string | undefined, IUser>
{
  private userRepository: IUserRepository;
  public constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public execute(email: string | undefined): Promise<IUser> {
    if (typeof email === "undefined") {
      return Promise.reject(new Error("Not provided email"));
    }
    return this.userRepository.getByEmail(email);
  }
}
