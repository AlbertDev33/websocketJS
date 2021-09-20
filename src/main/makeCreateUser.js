import { UserController } from "../controllers/UserController";
import { CreateToken } from "../utils/CreateToken";
import { UserRepository } from "../shared/infra/repository/UserRepository"
import { MongoConnection } from '../shared/infra/database/mongoConnection';
import { CreateUser } from "../services/CreateUser/CreateUser";
import { ValidationRequestBody } from "../services/ValidationRequestBody/ValidationRequestBody";
import { HashProvider } from '../shared/providers/HashPassword/HashPassword';

export const makeCreateUser = () => {
    const mongoConnection = new MongoConnection();
    const userRepository = new UserRepository(mongoConnection);
    const validationBody = new ValidationRequestBody();
    const hashPassword = new HashProvider();
    const createUser = new CreateUser(validationBody, userRepository, hashPassword);
    const createJWT = new CreateToken();

    return new UserController(createUser, createJWT);
}