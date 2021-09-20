import { hash, compare } from 'bcrypt';

const SALT_NUMBER = 10;

export class HashProvider {
    async generateHash(payload) {
        return hash(payload, SALT_NUMBER);
    }

    async compareHash(payload, hashedPassword) {
        return compare(payload, hashedPassword);
    }
}