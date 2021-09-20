import { Response } from 'express';
import { CreateUser } from '../services/CreateUser/CreateUser';

export class UserController {
    #MAX_AGE = 24 * 60 * 60;
    constructor(createUser, jwt) {
        this.createUser = createUser;
        this.jwt = jwt;
    }

    async handler(request, response) {
        const user = await this.createUser.execute(request.body);

        const token = this.jwt.createJWT(user.userId);

        const maxAge = this.#MAX_AGE * 1000;
        response.cookie('jwt', token, { httpOnly: true,  maxAge});
        return response.status(201).json(user)
    }
}