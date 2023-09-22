import { IUser } from "../models/User";

export interface IUserRepository {
  getAll: () => Promise<IUser[]>;
  getByEmail: (email: string) => Promise<IUser>;
  create: (user: IUser) => Promise<IUser>;
  update: (user: IUser) => Promise<IUser>;
  delete: (email: string) => Promise<IUser | boolean>;
}
