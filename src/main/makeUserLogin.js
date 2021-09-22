import { UserLoginController } from "../controllers/UserLoginController";
import { UserLogin } from "../services/UserLogin/UserLogin";
import { ValidationRequestBody } from '../services/ValidationRequestBody/ValidationRequestBody';
import { UserRepository } from '../shared/infra/repository/UserRepository';
import { MongoConnection } from '../shared/infra/database/mongoConnection';
import { HashProvider } from '../shared/providers/HashPassword/HashPassword';
import { GenerateToken } from '../shared/providers/GenerateToken/GenerateToken';

export const makeUserLogin = () => {
    const validationBody = new ValidationRequestBody();
    const mongoConnection = new MongoConnection()
    const userRepository = new UserRepository(mongoConnection);
    const hashPassword = new HashProvider();
    const userLogin = new UserLogin(validationBody, userRepository, hashPassword);

    const generateToken = new GenerateToken();
    
    return new UserLoginController(userLogin, generateToken);
}