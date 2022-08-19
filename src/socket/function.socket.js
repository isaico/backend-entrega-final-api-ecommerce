import {
    getMessagesDB,
    addMessageDB,
    getMessagesByEmailDB,
} from '../services/index.js';
import { io } from '../../server.js';
export const getMessages = async () => {
    try {
        const mensajes = await getMessagesDB();
        io.sockets.emit('mensajes', mensajes);
    } catch (error) {
        throw new Error(error);
    }
};
export const getMessagesByEmail = async (email) => {
    try {
        const mensajes = await getMessagesByEmailDB(email);
        console.log(mensajes,"lo que llega de la db buscado por mail")
        io.sockets.emit('mensajes', mensajes);
    } catch (error) {
        throw new Error(error);
    }
};
export const addMessage = async (msj) => {
    try {
        const dbResp = await addMessageDB(msj);
        await getMessages();
        throw new Error(error);
    } catch (error) {
        throw new Error(error);
    }
};
