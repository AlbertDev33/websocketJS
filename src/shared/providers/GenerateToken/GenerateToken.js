import jwt from 'jsonwebtoken';

const MAX_AGE = 24 * 60 * 60;

export class GenerateToken {
    generateJWT(userId) {
        return jwt.sign({ userId }, 'c69d9330b23e013c4d77a5ef03826cd0', {
            expiresIn: MAX_AGE,
        })
    }

    verifyUser(token) {
        return jwt.verify(token, 'c69d9330b23e013c4d77a5ef03826cd0');
    }
}