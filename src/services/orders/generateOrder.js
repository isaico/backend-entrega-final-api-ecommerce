import { OrderModel } from '../../models/index.js';
import '../../configs/db.config.js';

export const generateOrderDB = async (order) => {
    try {
        const resp = await OrderModel.create(order);
        return resp;
    } catch (error) {
        throw error;
    }
};
