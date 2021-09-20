import { ValidationBodyError } from "../../shared/errors/ValidationBodyError";

const REQUEST_BODY_ERROR = 'Invalid request body.';

const CREATE_USER_BODY = {
    name: 1,
    email: 2,
    password: 3,
};

const LOGIN_BODY = {
    email: 1,
    password: 2,
};

export class ValidationRequestBody {
    validation(body) {
        for (const key in CREATE_USER_BODY) {
            if (!body.hasOwnProperty(key)) {
                throw new ValidationBodyError(REQUEST_BODY_ERROR);
            }
        }
    }

    loginValidation(body) {
        for (const key in LOGIN_BODY) {
            if (!body.hasOwnProperty(key)) {
                throw new ValidationBodyError(REQUEST_BODY_ERROR);
            }
        }
    }
}