export class CreateUser {
    constructor(validationBody, userRepository) {
        this.validationBody = validationBody;
        this.userRepository = userRepository;
    }

    async execute(body) {
        this.validationBody.validation(body);

        const user = await this.userRepository.createUser(body);

        return user;
    }
}