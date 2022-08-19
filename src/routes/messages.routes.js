import express from 'express';
import { io } from '../../server.js';
import {
    getMessages,
    addMessage,
    getMessagesByEmail,
} from '../socket/function.socket.js';
import { isAuth } from '../middlewares/isAuth.js';
export const messagesRouter = express.Router();

messagesRouter.get('/chat:email?', isAuth, (req, res) => {
    const email = req.params.email;
    io.on('connection', (socket) => {
        console.log('nuevo usuario conectado');
        console.log(email, '->mail en ruta');
        getMessages();
        socket.on('nuevo-msj', (data) => {
            const email = req.session.user.email;
            const mutedData = { ...data, email: email, type: 'usuario' };
            addMessage(mutedData);
            getMessages();
        });
        if(email){
            getMessagesByEmail(email);
        }
    });
    res.render('layout/chat',{email});
});

