import { UserModel } from '../../models/User.model.js';
import '../../configs/db.config.js';

export const getUserDB = async (userName) => {
    try {
        const resp = await UserModel.findOne({ userName: userName });
        console.log(resp,"respues del db al buscara usuario")
        return resp
    } catch (error) {
        throw new Error(error)
    }
};
