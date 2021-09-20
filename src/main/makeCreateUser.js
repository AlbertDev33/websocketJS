import { UserController } from "../controllers/UserController";
import { CreateToken } from "../utils/CreateToken";
import { UserRepository } from "../shared/infra/repository/UserRepository"
import { MongoConnection } from '../shared/infra/database/mongoConnection';
import { CreateUser } from "../services/CreateUser/CreateUser";
import { ValidationRequestBody } from "../services/ValidationRequestBody/ValidationRequestBody";

export const makeCreateUser = () => {
    const mongoConnection = new MongoConnection();
    const userRepository = new UserRepository(mongoConnection);
    const validationBody = new ValidationRequestBody();
    const createUser = new CreateUser(validationBody, userRepository)
    const createJWT = new CreateToken();

    return new UserController(createUser, createJWT);
}