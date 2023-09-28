import HttpStatusCodes from "@src/domain/constants/HttpStatusCodes";
import { RouteError } from "@src/domain/other/classes";
import express, { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  let status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

export default app;
