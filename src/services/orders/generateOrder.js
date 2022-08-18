import { OrderModel } from '../../models/index.js';
import '../../configs/db.config.js';

export const generateOrderDB = async (order) => {
    try {
        // const { body } = req;
        // const  cartId  = req.params.id;
        // const orderState = 'generada'
        // const cart = await getCartDB(cartId);
        // const order = {
        //     items:cart.productos,
        //     estado:orderState,
        //     adress:body.adress,
        //     timeStamp:new Date()
        // }
        const resp = await OrderModel.create(order);
        return resp;
    } catch (error) {
        throw error;
    }
};
