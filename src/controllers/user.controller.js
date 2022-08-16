import jwt from 'jsonwebtoken';
import { createUserDB, getUserDB } from '../services/index.js';
import _ from 'underscore';

export const createUser = async (req, res) => {
    const { body } = req;
    if(body.password === body.rewritePassword){
        const password = jwt.sign({ password: body.password }, process.env.JWT_KEY);
        body.password = password;
        try {
            const resp = await createUserDB(body);
            res.status(200).render('layout/signupSucces',{user:resp.userName});
        } catch (error) {
            throw new Error(error);
        }
    }else{
        res.status(500).send("validacion de contraseña incorrecta, intente nuevamente <button><a href='/signup'>click</a></button>")
    }
};

export const login = async (req, res) => {
    const { body } = req;
    console.log(body,"lo que llega del req ")
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
            let userWhitoutPass = _.omit(user, 'password');//deepcopy del objeto sin el key password
            const token = jwt.sign(
                { userWhitoutPass }, 
                process.env.JWT_KEY, {
                expiresIn: '5m',
            });
            req.session.token=token
            res.render('layout/loginSucces',{user:user.userName})
        }else{
            res.status(401).send("usuario o clave incorrecto")
        }
    } catch (error) {
        throw new Error(error)
    }
};
