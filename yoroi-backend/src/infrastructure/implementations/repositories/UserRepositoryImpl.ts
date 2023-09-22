import { IUser } from "@src/domain/models/User";
import { IUserRepository } from "@src/domain/repositories/UserRepository";
import { PgPool } from "@src/frameworks/PgPool";
import { hashSync } from "@src/domain/util/PwdUtil";

export class UserRepositoryImpl implements IUserRepository {
  async getAll(): Promise<IUser[]> {
    const result = await PgPool.query("SELECT * FROM public.tbl_user");
    return Promise.resolve(result.rows);
  }

  async create(user: IUser): Promise<IUser> {
    user.password = hashSync(user.password);
    const result = await PgPool.query(
      "INSERT INTO public.tbl_user(email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [user.email, user.password, user.role]
    );
    return Promise.resolve(result.rows[0]);
  }

  async update(user: IUser): Promise<IUser> {
    const result = await PgPool.query(
      "UPDATE public.tbl_user SET password=$1, role=$2 WHERE email=$3",
      [user.email, user.password, user.role]
    );
    return Promise.resolve(result.rows[0]);
  }

  async delete(email: string): Promise<IUser | boolean> {
    const result = await PgPool.query(
      "DELETE FROM public.tbl_user WHERE email=$1",
      [email]
    );
    const wasDeleted = result.rowCount === 0;
    return Promise.resolve(wasDeleted);
  }

  async getByEmail(email: string): Promise<IUser> {
    const result = await PgPool.query(
      "SELECT * FROM public.tbl_user WHERE email=$1",
      [email]
    );
    return Promise.resolve(result.rows[0]);
  }
}
