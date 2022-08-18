import { MessagesModel } from '../../models/index.js';
import '../../configs/db.config.js';

export const getMessagesDB = async () => {
    try {
        const resp = await MessagesModel.find();
        return resp;
    } catch (error) {
        throw new Error(error)
    }
};
