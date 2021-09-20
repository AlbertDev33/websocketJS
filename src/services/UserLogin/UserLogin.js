import { InvalidUserError } from "../../shared/errors/InvalidUserError";

const LOGIN_ERROR_MESSAGE = 'User does not exits.';

export class UserLogin {
    constructor(validationBody, userRepository) {
        this.validationBody = validationBody;
        this.userRepository = userRepository;
    }

    async execute(body) {
        this.validationBody.loginValidation(body);

        const user = await this.userRepository.findByEmail(body);
        if (!user) {
            throw new InvalidUserError(LOGIN_ERROR_MESSAGE);
        }
    }
}