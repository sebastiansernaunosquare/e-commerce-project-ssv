import { mockUser } from "@src/domain/mocks/UserMocks";
import { IUser } from "@src/domain/models/User";
// eslint-disable-next-line max-len
import { UserRepositoryImpl } from "@src/infrastructure/implementations/repositories/user/UserRepositoryImpl";
import UserService from "./UserService";

jest.mock(
  "@src/infrastructure/implementations/repositories/user/UserRepositoryImpl",
  () => {
    return {
      UserRepositoryImpl: jest.fn().mockImplementation(() => {
        return {
          getAll: (): Promise<IUser[]> => Promise.resolve([mockUser]),
          create: (): Promise<IUser> => Promise.resolve(mockUser),
          update: (): Promise<IUser> => Promise.resolve(mockUser),
          delete: (): Promise<boolean> => Promise.resolve(true),
          getByEmail: (): Promise<IUser> => Promise.resolve(mockUser),
        };
      }),
    };
  },
);

describe("UserService", () => {
  const MockedUserRepositoryImpl = jest.mocked(UserRepositoryImpl);

  beforeEach(() => {
    MockedUserRepositoryImpl.mockClear();
  });

  test("should get all user from the repository", async () => {
    const users = await UserService.getAll();
    expect(users.length).toBeGreaterThan(0);
    expect(MockedUserRepositoryImpl).toHaveBeenCalled();
  });

  test("should create an user an return from the repository", async () => {
    const user = await UserService.addOne(mockUser);
    expect(user.email).toBe(mockUser.email);
    expect(MockedUserRepositoryImpl).toHaveBeenCalled();
  });

  test("should update an user an return from the repository", async () => {
    const user = await UserService.updateOne(mockUser);
    expect(user.email).toBe(mockUser.email);
    expect(MockedUserRepositoryImpl).toHaveBeenCalled();
  });

  test("should delete an user an return a boolean from the repository", async () => {
    const wasDeleted = await UserService.delete(mockUser.email);
    expect(wasDeleted).toBeTruthy();
    expect(MockedUserRepositoryImpl).toHaveBeenCalled();
  });

  test("should get an user by email return from the repository", async () => {
    const user = await UserService.getByEmail(mockUser.email);
    expect(user.email).toBe(mockUser.email);
    expect(MockedUserRepositoryImpl).toHaveBeenCalled();
  });
});
