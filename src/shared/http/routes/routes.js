import { response, Router } from 'express';
import { makeCreateUser } from '../../../main/makeCreateUser';
import { makeUserLogin } from '../../../main/makeUserLogin';
import { makeVerifyUser } from '../../../main/makeVerifyUser';

export const router = Router();

router.post('/users', async (request, response) => {
    await makeCreateUser().handler(request, response);
});

router.post('/login', async (request, response) => {
    await makeUserLogin().handler(request, response);
});

router.get('/verifyuser', async (request, response, next) => {
    await makeVerifyUser().handler(request, response, next);
    next();
});