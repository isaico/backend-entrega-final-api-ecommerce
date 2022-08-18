import { MessagesModel } from '../../models/index.js';
import '../../configs/db.config.js';

export const getMessagesByEmailDB = async (email) => {
    try {
        console.log(email,"email enviado hacia services")
        const resp = await MessagesModel.find({email:email})
        console.log(resp,"encontrado de la db  con mail")
        return resp
    } catch (error) {
        throw new Error(error)
        
    }
};