import { InvalidUserError } from "../../shared/errors/InvalidUserError";

const IS_VALID_USER = 'User does not exits.';
const LOGIN_ERROR_MESSAGE = 'E-mail or password not match.';

export class UserLogin {
    constructor(validationBody, userRepository, hashPassword) {
        this.validationBody = validationBody;
        this.userRepository = userRepository;
        this.hashPassword = hashPassword;
    }

    async execute(body) {
        this.validationBody.loginValidation(body);

        const { email, password } = body;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new InvalidUserError(IS_VALID_USER);
        }

        const isValidUser = await this.hashPassword.compareHash(password, user.password);

        if (!isValidUser) {
            throw new InvalidUserError(LOGIN_ERROR_MESSAGE);
        }
        
        user.userId = user._id;
        delete user._id;
        delete user.password;
        return user;
    }
}