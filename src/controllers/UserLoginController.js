export class UserLoginController {
    #MAX_AGE = 24 * 60 * 60;

    constructor(userLogin,generateToken) {
        this.userLogin = userLogin;
        this.generateToken = generateToken;
    }
    async handler(request, response) {
        const user = await this.userLogin.execute(request.body);
        const token = this.generateToken.generateJWT(user.userId);
        
        const maxAge = this.#MAX_AGE * 1000;
        response.cookie('jwt', token, { httpOnly: true, maxAge });
        response.status(200).json(user);
    }
}