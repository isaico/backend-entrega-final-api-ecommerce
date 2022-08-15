import express from 'express';
import session from 'express-session';
import 'dotenv/config';
import { productRouter, cartRouter, userRouter } from './src/routes/index.js';
import { isAuth } from './src/middlewares/isAuth.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session({
        store: MongoStore.create({
            mongoUrl:process.env.MONGOATLAS_URI_SESSION,
                // 'mongodb+srv://isaico:isaias159@cluster0.ai4r7.mongodb.net/sessions',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        }),
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000,
        },
    })
);

app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/', userRouter);
app.get('/data', isAuth, (req, res) => {
    console.log('Usuario autorizado');
    console.log('Estas autenticado');
    res.send('Estas autenticado');
});

const server = app.listen(PORT, () => {
    console.log(` 🚀🔥server is runing at http://localhost:${PORT} 🚀🔥`);
});

server.on('error', (err) => {
    console.log(err);
});
