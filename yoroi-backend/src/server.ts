/**
 * Setup express server.
 */

import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import logger from "jet-logger";

import "express-async-errors";

import BaseRouter from "@src/routes/api";
import Paths from "@src/domain/constants/Paths";

import EnvVars from "@src/domain/constants/EnvVars";
import HttpStatusCodes from "@src/domain/constants/HttpStatusCodes";

import { NodeEnvs } from "@src/domain/constants/misc";
import { RouteError } from "@src/domain/other/classes";

import swaggerUI from "swagger-ui-express";
import swaggerDocsSpec from "@src/frameworks/swagger";

import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "@src/frameworks/GraphqlSchema";

// **** Variables **** //

const app = express();

app.all("/graphql", createHandler({ schema }));

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan("dev"));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocsSpec));

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
      logger.err(err, true);
    }
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }
    return res.status(status).json({ error: err.message });
  }
);

// **** Export default **** //

export default app;
