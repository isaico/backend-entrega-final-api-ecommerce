import express from 'express';
import session from 'express-session';
import 'dotenv/config';
import {
    productRouter,
    cartRouter,
    userRouter,
    orderRouter,
} from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import path from 'path';
import http from 'http';
const app = express();
const server = http.createServer(app);
import { Server } from 'socket.io';
import { messagesRouter } from './src/routes/messages.routes.js';
import  VARIABLES  from './configEnv.js';

export const io = new Server(server);
const PORT = VARIABLES.PORT;
/* ------------------------------ SERVER CONFIG ----------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGOATLAS_URI_SESSION,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        }),
        secret: 'asd',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: Number(VARIABLES.COOKIE_EXP_TIME),
        },
    })
);
/* --------------------------------- ROUTES --------------------------------- */
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/', userRouter);
app.use('/api', orderRouter);
app.use('/api', messagesRouter);

app.use('/srvenv', (req, res) => {
    res.status(200).render('layout/variables', {
        VARIABLES: {
            PORT: VARIABLES.PORT,
            HOST: VARIABLES.HOST,
            NODE_ENV: VARIABLES.NODE_ENV,
            MONGOATLAS_URI_SESSION: VARIABLES.MONGOATLAS_URI_SESSION,
            MONGOATLAS_URI: VARIABLES.MONGOATLAS_URI,
            COOKIE_EXP_TIME:VARIABLES.COOKIE_EXP_TIME,
            NODEMAILER_GMAIL_ADRESS:VARIABLES.NODEMAILER_GMAIL_ADRESS
        },
    });
});
app.use('*', (req, res) => {
    res.status(404).send('ups!, ruta no encontrada ');
});
server.listen(PORT, () => {
    console.log(` 🚀🔥server is runing at http://localhost:${PORT} 🚀🔥`);
});
server.on('error', (err) => {
    console.log(err);
});
