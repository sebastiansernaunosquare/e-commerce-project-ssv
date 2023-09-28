import { UserRepositoryImpl } from "./UserRepositoryImpl";
import { mockUser } from "@src/domain/mocks/UserMocks";
import { PgPool } from "@src/frameworks/PgPool";

describe("UserRepositoryImpl", () => {
  const userRepositoryImpl = new UserRepositoryImpl();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should get all the users from the database when calling getAll", async () => {
    const pgPoolQuerySpy = jest
      .spyOn(PgPool, "query")
      .mockImplementationOnce(() => {
        return Promise.resolve({ rows: [mockUser] });
      });
    const users = await userRepositoryImpl.getAll();
    expect(users.length).toBeGreaterThan(0);
    expect(pgPoolQuerySpy).toHaveBeenCalled();
  });

  test("should create an user on DB and return it", async () => {
    const pgPoolQuerySpy = jest
      .spyOn(PgPool, "query")
      .mockImplementationOnce(() => {
        return Promise.resolve({ rows: [mockUser] });
      });
    const user = await userRepositoryImpl.create(mockUser);
    expect(user.email).toBe(mockUser.email);
    expect(pgPoolQuerySpy).toHaveBeenCalled();
  });

  test("should update an user on DB and return it", async () => {
    const updateUser = { ...mockUser, email: "updated@mail.com" };
    const pgPoolQuerySpy = jest
      .spyOn(PgPool, "query")
      .mockImplementationOnce(() => {
        return Promise.resolve({ rows: [updateUser] });
      });
    const user = await userRepositoryImpl.update(updateUser);
    expect(user.email).toBe(updateUser.email);
    expect(pgPoolQuerySpy).toHaveBeenCalled();
  });

  test("should get an user by email from DB and return it", async () => {
    const pgPoolQuerySpy = jest
      .spyOn(PgPool, "query")
      .mockImplementationOnce(() => {
        return Promise.resolve({ rows: [mockUser] });
      });
    const user = await userRepositoryImpl.getByEmail(mockUser.email);
    expect(user.email).toBe(mockUser.email);
    expect(pgPoolQuerySpy).toHaveBeenCalled();
  });

  test("should delete an user from DB and return a boolean", async () => {
    const pgPoolQuerySpy = jest
      .spyOn(PgPool, "query")
      .mockImplementationOnce(() => {
        return Promise.resolve({ rowCount: 0 });
      });
    const wasDeleted = await userRepositoryImpl.delete(mockUser.email);
    expect(wasDeleted).toBeTruthy();
    expect(pgPoolQuerySpy).toHaveBeenCalled();
  });
});
