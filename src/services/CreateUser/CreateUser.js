import { CreateUserError } from '../../shared/errors/CreateUserError';

const USER_ERROR_MESSAGE = 'User already exists.';

export class CreateUser {
    constructor(validationBody, userRepository, hashPassword) {
        this.validationBody = validationBody;
        this.userRepository = userRepository;
        this.hashPassword = hashPassword;
    }

    async execute(body) {
        this.validationBody.validation(body);

        const userAlreadyExists = await this.userRepository.findByEmail(body);

        if (userAlreadyExists) {
            throw new CreateUserError(USER_ERROR_MESSAGE);
        }

        body.password = await this.hashPassword.generateHash(body.password);
        const user = await this.userRepository.createUser(body);

        return user;
    }
}