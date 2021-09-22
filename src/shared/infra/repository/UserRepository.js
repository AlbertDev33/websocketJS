import { ObjectId } from 'mongodb';

import { ValidationBodyError } from "../../errors/ValidationBodyError";

export class UserRepository {
    #COLLECTION_NAME = 'users';
    #database;
    constructor(connect) {
        this.#database = connect.connection();
    }

    async createUser(user) {
        const { insertedId } = await (await this.#database)
            .collection(this.#COLLECTION_NAME)
            .insertOne(user);

        user.userId = insertedId;
        delete user._id;
        return user;
    }

    async findByEmail(email) {
        const user = (await this.#database)
            .collection(this.#COLLECTION_NAME)
            .findOne({ email });

        return user;
    }

    async findById(userId) {
        const user = await (await this.#database)
            .collection(this.#COLLECTION_NAME)
            .findOne({ _id: ObjectId(userId) });

        return user;
    }
}