import { GetUserByEmailUseCase } from "./GetUserByEmail";
import { mockUser, mockUserRepository } from "@src/domain/mocks/UserMocks";

describe("GetUserByEmailUseCase", () => {
  const getUserByEmailUseCase = new GetUserByEmailUseCase(mockUserRepository);

  test("should create the GetUserByEmailUseCase", () => {
    expect(getUserByEmailUseCase).toBeTruthy();
  });

  test("should return the user when executing the usecase and spy user repository", async () => {
    const userRepositorySpy = jest.spyOn(mockUserRepository, "getByEmail");
    const user = await getUserByEmailUseCase.execute(mockUser.email);
    expect(user.email).toBe(mockUser.email);
    expect(userRepositorySpy).toHaveBeenCalled();
  });

  test("should reject when no user is provided when executing get user usecase", async () => {
    try {
      await getUserByEmailUseCase.execute(undefined);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
