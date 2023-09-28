import { IUser } from "../models/User";
import { IUserRepository } from "../repositories/UserRepository";

export const mockUser: IUser = {
  email: "mock@mail.com",
  password: "mockPassword",
  role: 0,
};

export const mockUserRepository: IUserRepository = {
  create: jest.fn().mockReturnValue(Promise.resolve(mockUser)),
  delete: jest.fn().mockReturnValue(Promise.resolve(true)),
  getAll: jest.fn().mockReturnValue(Promise.resolve([mockUser])),
  getByEmail: jest.fn().mockReturnValue(Promise.resolve(mockUser)),
  update: jest.fn().mockReturnValue(Promise.resolve(mockUser)),
};
