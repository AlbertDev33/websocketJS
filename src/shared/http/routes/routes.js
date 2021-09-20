import { Router } from 'express';
import { makeCreateUser } from '../../../main/makeCreateUser';

export const router = Router();

router.post('/users', async (request, response) => {
    await makeCreateUser().handler(request, response);
});