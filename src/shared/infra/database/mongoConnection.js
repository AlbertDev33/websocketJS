import { MongoClient } from 'mongodb';

const DB_NAME = 'socketio'
const MONGO_CONNECTION = `mongodb://localhost:27017/${DB_NAME}`;

export class MongoConnection {
    #mongo;
    #dbname = DB_NAME;

    async connection() {
        if (!this.#mongo || !this.#mongo.isConnected()) {
            this.#mongo = await MongoClient.connect(MONGO_CONNECTION, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
        return this.#mongo.db(this.#dbname);
    }
}