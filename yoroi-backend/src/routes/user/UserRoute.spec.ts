import UserRouter from "./UserRoutes";
import app from "@src/frameworks/MockAppServer";
import request from "supertest";
import UserService from "@src/infrastructure/driven-adapters/services/user/UserService";
import Paths from "@src/domain/constants/Paths";
import { mockUser } from "@src/domain/mocks/UserMocks";
import HttpStatusCodes from "@src/domain/constants/HttpStatusCodes";

const BASE_URL = `${Paths.Base}${Paths.Users.Base}`;

app.use(BASE_URL, UserRouter);

describe("UserRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("/users", () => {
    test("GET should get a 200 response and a list of users", async () => {
      const userServiceGetAllSpy = jest
        .spyOn(UserService, "getAll")
        .mockImplementationOnce(() => {
          return Promise.resolve([mockUser]);
        });
      const response = await request(app).get(BASE_URL);
      expect(response.statusCode).toBe(HttpStatusCodes.OK);
      expect(userServiceGetAllSpy).toHaveBeenCalled();
    });

    test("POST should get a 201 response and create an user", async () => {
      const userServiceGetAllSpy = jest
        .spyOn(UserService, "addOne")
        .mockImplementationOnce(() => {
          return Promise.resolve(mockUser);
        });
      const response = await request(app)
        .post(BASE_URL)
        .send({ user: mockUser });
      expect(response.statusCode).toBe(HttpStatusCodes.CREATED);
      expect(userServiceGetAllSpy).toHaveBeenCalled();
    });

    test("PUT should get a 200 response and update an user", async () => {
      const userServiceGetAllSpy = jest
        .spyOn(UserService, "updateOne")
        .mockImplementationOnce(() => {
          return Promise.resolve(mockUser);
        });
      const response = await request(app)
        .put(BASE_URL)
        .send({ user: mockUser });
      expect(response.statusCode).toBe(HttpStatusCodes.OK);
      expect(userServiceGetAllSpy).toHaveBeenCalled();
    });

    test("DELETE should get a 200 response and delete the user", async () => {
      const userServiceGetAllSpy = jest
        .spyOn(UserService, "delete")
        .mockImplementationOnce(() => {
          return Promise.resolve(true);
        });
      const response = await request(app)
        .delete(BASE_URL)
        .send({ user: mockUser });
      expect(response.statusCode).toBe(HttpStatusCodes.OK);
      expect(userServiceGetAllSpy).toHaveBeenCalled();
    });
  });
});
