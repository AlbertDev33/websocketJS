import { VerifyUser } from "../controllers/VerifyUser"
import { TokenVerify } from "../services/TokenVerify/TokenVerify"
import { MongoConnection } from "../shared/infra/database/mongoConnection";
import { UserRepository } from "../shared/infra/repository/UserRepository";
import { GenerateToken } from '../shared/providers/GenerateToken/GenerateToken';

export const makeVerifyUser = () => {
    const mongoConnection = new MongoConnection();
    const userRepository = new UserRepository(mongoConnection);

    const generateToken = new GenerateToken();
    const tokenVerify = new TokenVerify(generateToken, userRepository)

    return new VerifyUser(tokenVerify);
}