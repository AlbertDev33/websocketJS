import { InvalidUserError } from "../../shared/errors/InvalidUserError";

export class TokenVerify {
    #TOKEN_ERROR = 'Invalid token';
    constructor(verify, userRepository) {
        this.verify = verify;
        this.userRepository = userRepository;
    }

    async verifyToken(token) {
        if (!token) {
            throw new Error(this.#TOKEN_ERROR);
        }

        const verifiedToken = this.verify.verifyUser(token);

        if (!verifiedToken) {
            throw new InvalidUserError();
        }

        const user = await this.userRepository.findById(verifiedToken.userId);

        if (!user) {
            throw new InvalidUserError();
        }

        return user;
    }
}