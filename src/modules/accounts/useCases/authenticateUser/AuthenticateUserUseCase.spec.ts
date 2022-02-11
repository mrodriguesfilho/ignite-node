import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUsersUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );

    createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("it should be able to authenticte an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "11111",
      email: "user@test.com",
      password: "test",
      name: "test",
    };

    await createUsersUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("it shouldn't be able to authenticate non-existent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "error@notgoing.com",
        password: "password",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("it shouldn't be able to authenticate users with an incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "11111",
        email: "user@test.com",
        password: "test",
        name: "test",
      };

      await createUsersUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "password",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
