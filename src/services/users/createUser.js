import { UserModel } from '../../models/User.model.js';
import '../../configs/db.config.js';

export const createUserDB = async (user) => {
    try {
        const resp = await UserModel.create(user);
        const searchUser = await UserModel.find({ email: user.email });
        const findUserOnResponse = searchUser.find((e) => e.email);
        if (findUserOnResponse.email === resp.email) {
            return null;
        } else {
            return resp;
        }
    } catch (error) {
        throw new Error(error);
    }
};
