import { UserRepositoryImpl } from "@src/infrastructure/implementations/repositories/user/UserRepositoryImpl";

import { compare } from "@src/domain/util/PwdUtil";
import { tick } from "@src/domain/util/misc";

import HttpStatusCodes from "@src/domain/constants/HttpStatusCodes";
import { RouteError } from "@src/domain/other/classes";
import { IUser } from "@src/domain/models/User";
import { GetUserByEmailUseCase } from "@src/application/use-cases/user/get-user-by-email/GetUserByEmail";

export const Errors = {
  Unauth: "Unauthorized",
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;

// **** Functions **** //

/**
 * Login a user.
 */
async function login(email: string, password: string): Promise<IUser> {
  const userRepository = new UserRepositoryImpl();
  const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
  const user = await getUserByEmailUseCase.execute(email);
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.EmailNotFound(email),
    );
  }

  const hash = user.password ?? "",
    pwdPassed = await compare(password, hash);
  if (!pwdPassed) {
    await tick(500);
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, Errors.Unauth);
  }
  return user;
}

export default {
  login,
} as const;
