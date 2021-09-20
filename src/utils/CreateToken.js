import jwt from 'jsonwebtoken';

const MAX_AGE = 24 * 60 * 60;

export class CreateToken {
    createJWT(userId) {
        return jwt.sign({ userId }, 'chatroom secret', {
            expiresIn: MAX_AGE,
        })
    }
}