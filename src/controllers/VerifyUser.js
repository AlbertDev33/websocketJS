export class VerifyUser {
    constructor(verifyToken) {
        this.verifyToken = verifyToken;
    }

    async handler(request, response, next) {
        const token = request.headers.cookie.replace('jwt=', '');
        await this.verifyToken.verifyToken(token);
        next();
    }
}