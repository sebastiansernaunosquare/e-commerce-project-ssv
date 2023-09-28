import { UserRepositoryImpl } from "@src/infrastructure/implementations/repositories/user/UserRepositoryImpl";
import { IUser } from "@src/domain/models/User";
import { GetAllUsersUseCase } from "@src/application/use-cases/user/get-all-users/GetAllUsersUseCase";
import { CreateUserUseCase } from "@src/application/use-cases/user/create-user/CreateUserUseCase";
import { UpdateUserUseCase } from "@src/application/use-cases/user/update-user/UpdateUserUseCase";
import { DeleteUserUseCase } from "@src/application/use-cases/user/delete-user/DeleteUserUseCase";
import { GetUserByEmailUseCase } from "@src/application/use-cases/user/get-user-by-email/GetUserByEmail";

function getAll(): Promise<IUser[]> {
  const userRepositoryImpl = new UserRepositoryImpl();
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepositoryImpl);
  return getAllUsersUseCase.execute();
}

/**
 * Add one user.
 */
function addOne(user: IUser): Promise<IUser> {
  const userRepositoryImpl = new UserRepositoryImpl();
  const createUserUseCase = new CreateUserUseCase(userRepositoryImpl);
  return createUserUseCase.execute(user);
}

function updateOne(user: IUser): Promise<IUser> {
  const userRepositoryImpl = new UserRepositoryImpl();
  const updateUserUseCase = new UpdateUserUseCase(userRepositoryImpl);
  return updateUserUseCase.execute(user);
}

function _delete(email: string): Promise<IUser | boolean> {
  const userRepositoryImpl = new UserRepositoryImpl();
  const deleteUserUseCase = new DeleteUserUseCase(userRepositoryImpl);
  return deleteUserUseCase.execute(email);
}

function getByEmail(email: string): Promise<IUser> {
  const userRepositoryImpl = new UserRepositoryImpl();
  const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepositoryImpl);
  return getUserByEmailUseCase.execute(email);
}

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  getByEmail,
} as const;
