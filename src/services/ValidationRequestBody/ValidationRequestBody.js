import { ValidationBodyError } from "../../shared/errors/ValidationBodyError";

const REQUEST_BODY_ERROR = 'Invalid request body.';

const USER_SHAPE = {
    name: '',
    email: '',
    password: '',
};

export class ValidationRequestBody {
    validation(body) {
        for (const key in USER_SHAPE) {
            if (!body.hasOwnProperty(key)) {
                throw new ValidationBodyError(REQUEST_BODY_ERROR);
            }
        }
    }
}