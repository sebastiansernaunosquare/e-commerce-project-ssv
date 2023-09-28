import { GetAllUsersUseCase } from "./GetAllUsersUseCase";
import { mockUserRepository } from "@src/domain/mocks/UserMocks";

describe("GetAllUsersUseCase", () => {
  const getAllUsersUseCase = new GetAllUsersUseCase(mockUserRepository);

  test("should create the GetAllUsersUseCase", () => {
    expect(getAllUsersUseCase).toBeTruthy();
  });

  test("should return a list of users when executing the usecase and spy user repository", async () => {
    const userRepositorySpy = jest.spyOn(mockUserRepository, "getAll");
    const users = await getAllUsersUseCase.execute();
    expect(users.length).toBeGreaterThan(0);
    expect(userRepositorySpy).toHaveBeenCalled();
  });
});
