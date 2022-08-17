import { OrderModel } from '../../models/index.js';
import '../../configs/db.config.js';
import { getCartDB } from '../carts/getCart.js';

export const generateOrderDB = async (req, res) => {
    try {
        const { body } = req;
        const { params } = req.params;
        const cartItems = await getCartDB(params.cartId);
        //terminar de pedir los datos del cart para generar la orden
        const resp = await OrderModel.create();
        return resp;
    } catch (error) {
        throw error;
    }
};
