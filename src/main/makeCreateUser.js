import { UserController } from "../controllers/UserController";
import { GenerateToken } from "../shared/providers/GenerateToken/GenerateToken";
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
    const generateToken = new GenerateToken();

    return new UserController(createUser, generateToken);
}