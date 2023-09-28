import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { mockUser, mockUserRepository } from "@src/domain/mocks/UserMocks";

describe("DeleteUserUseCase", () => {
  const deleteUserUseCase = new DeleteUserUseCase(mockUserRepository);

  test("should create the DeleteUserUseCase", () => {
    expect(deleteUserUseCase).toBeTruthy();
  });

  test("should return a boolean when executing the usecase and spy user repository", async () => {
    const userRepositorySpy = jest.spyOn(mockUserRepository, "delete");
    const deletedUser = await deleteUserUseCase.execute(mockUser.email);
    expect(deletedUser).toBeTruthy();
    expect(userRepositorySpy).toHaveBeenCalled();
  });

  test("should reject when no user is provided when executing create user usecase", async () => {
    try {
      await deleteUserUseCase.execute(undefined);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
