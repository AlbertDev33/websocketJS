import express from 'express';
import 'express-async-errors';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { router } from './shared/http/routes/routes';
import { ValidationBodyError } from './shared/errors/ValidationBodyError';
import { CreateUserError } from './shared/errors/CreateUserError';
import { InvalidUserError } from './shared/errors/InvalidUserError';

const io = socketio(http);
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    Credential: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.use(cookieParser);

app.use(
    async (err, _, response, next) => {
        if (err instanceof ValidationBodyError) {
            return response.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message,
            });
        }

        if (err instanceof CreateUserError) {
            return response.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message,
            });
        }

        if (err instanceof InvalidUserError) {
            return response.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message,
            });
        }

        return response.status(500).json({
            statusCode: '500',
            message: `Internal Server Error: ${err.message}`,
        })
    }
)

app.listen(3333, () => { console.log('Running') });