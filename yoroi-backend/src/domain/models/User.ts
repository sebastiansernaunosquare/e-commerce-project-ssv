// **** Variables **** //

export enum UserRoles {
  Standard,
  Admin,
}

// **** Types **** //

export interface IUser {
  email: string;
  password: string;
  role: number;
}

export interface ISessionUser {
  id: number;
  email: string;
  name: string;
  role: IUser["role"];
}
