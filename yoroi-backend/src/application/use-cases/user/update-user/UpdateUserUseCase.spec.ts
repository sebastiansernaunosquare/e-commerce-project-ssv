import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { mockUser, mockUserRepository } from "@src/domain/mocks/UserMocks";

describe("UpdateUserUseCase", () => {
  const updateUserUseCase = new UpdateUserUseCase(mockUserRepository);

  test("should create the UpdateUserUseCase", () => {
    expect(updateUserUseCase).toBeTruthy();
  });

  test("should return the user when executing the usecase and spy user repository", async () => {
    const userRepositorySpy = jest.spyOn(mockUserRepository, "update");
    const user = await updateUserUseCase.execute(mockUser);
    expect(user.email).toBe(mockUser.email);
    expect(userRepositorySpy).toHaveBeenCalled();
  });

  test("should reject when no user is provided when executing get user usecase", async () => {
    try {
      await updateUserUseCase.execute(undefined);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
