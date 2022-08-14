import express from 'express'

import {
    createUser,
    login
} from '../controllers/index.js'

export const userRouter = express.Router()

userRouter.post('/',login)
userRouter.post('/register',createUser)

