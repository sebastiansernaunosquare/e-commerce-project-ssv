import { CreateUserUseCase } from "./CreateUserUseCase";
import { mockUser, mockUserRepository } from "@src/domain/mocks/UserMocks";

describe("CreateUserUseCase", () => {
  const createUserUseCase = new CreateUserUseCase(mockUserRepository);

  test("should create the CreateUserUseCase", () => {
    expect(createUserUseCase).toBeTruthy();
  });

  test("should return the user when executing the usecase and spy user repository", async () => {
    const userRepositorySpy = jest.spyOn(mockUserRepository, "create");
    const user = await createUserUseCase.execute(mockUser);
    expect(user.email).toBe(mockUser.email);
    expect(userRepositorySpy).toHaveBeenCalled();
  });

  test("should reject when no user is provided when executing create user usecase", async () => {
    try {
      await createUserUseCase.execute(undefined);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
