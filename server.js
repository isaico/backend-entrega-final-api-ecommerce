import express from 'express';
import session from 'express-session';
import 'dotenv/config';
import { productRouter, cartRouter, userRouter } from './src/routes/index.js';
import { isAuth } from './src/middlewares/isAuth.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import path from 'path';
const app = express();
const PORT = process.env.PORT || 8080;

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
        secret: "asd",
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
    res.send('Estas autenticado');
});
app.get('/hbs', (req, res) => {
    res.render('layout/index');
});

const server = app.listen(PORT, () => {
    console.log(` 🚀🔥server is runing at http://localhost:${PORT} 🚀🔥`);
});

server.on('error', (err) => {
    console.log(err);
});
