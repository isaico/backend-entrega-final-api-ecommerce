import { generateOrderDB } from '../services/orders/generateOrder.js';
import { getCartDB } from '../services/index.js';  
export const generateOrder = async (req, res) => {
    try {
        const { body } = req;
        const cartId = req.params.id;
        const orderState = 'generada';
        const cart = await getCartDB(cartId);
        const userEmail=req.session.user.email
        const order = {
            items: cart.productos,
            estado: orderState,
            email:userEmail,
            adress: body.adress,
            timeStamp: new Date(),
        };
        const resp = await generateOrderDB(order);
        if (resp) {
            res.status(200).send(
                `order generada con exito N° de orden: ${resp._id}`
            );
        } else {
            res.status(400).send(
                `no se pudo generar la orden por un error, intente nuevamente`
            );
        }
    } catch (error) {
        throw error
    }
};
