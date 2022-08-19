import express from 'express';

import { createUser, login } from '../controllers/index.js';

export const userRouter = express.Router();

userRouter.post('/', login);
userRouter.post('/signup', createUser);
userRouter.get('/signup', (req, res) => {
    res.render('layout/signup');
});
userRouter.get('/', (req, res) => {
    res.render('layout/index');
});
