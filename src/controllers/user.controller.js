import jwt from 'jsonwebtoken';
import { createUserDB, getUserDB } from '../services/index.js';
import _ from 'underscore';
import { sendMailGmail } from '../utils/nodemailer.utils.js';

export const createUser = async (req, res) => {
    const { body } = req;
    if (body.password === body.rewritePassword) {
        const password = jwt.sign(
            { password: body.password },
            process.env.JWT_KEY
        );
        body.password = password;
        try {
            const resp = await createUserDB(body);
            if (resp !== null) {
                sendMailGmail({
                    from: process.env.NODEMAILER_GMAIL_ADRESS,
                    to: [body.email],
                    subject: 'Nuevo usuario creado!',
                    text: `
                    datos del usuario:
                    nombre de usuario: ${body.userName},
                    email: ${body.email},
                    nombre completo :${body.firstName} ${body.lastName},
                    `,
                });
                res.status(200).render('layout/signupSucces', {
                    user: resp.userName,
                });
            }else{
                res.status(500).send(`usuario ya creado por favor logeate <button><a href='/'>logearme</a></button>`)
            }
        } catch (error) {
            throw new Error(error);
        }
    } else {
        res.status(500).send(
            "validacion de contraseña incorrecta, intente nuevamente <button><a href='/signup'>click</a></button>"
        );
    }
};

export const login = async (req, res) => {
    const { body } = req;
    try {
        const user = await getUserDB(body.userName);
        if (!user) {
            res.status(404).send('usuario no encontrado');
        }
        const password = jwt.verify(
            user.password,
            process.env.JWT_KEY
        ).password;
        if (body.password === password) {
            let userWhitoutPass = _.omit(user, 'password'); //deepcopy del objeto sin el key password
            const token = jwt.sign({ userWhitoutPass }, process.env.JWT_KEY, {
                expiresIn: '5m',
            });
            req.session.token = token;
            req.session.user = userWhitoutPass;
            res.render('layout/loginSucces', { user: user.userName });
        } else {
            res.status(401).send('usuario o clave incorrecto');
        }
    } catch (error) {
        throw new Error(error);
    }
};
