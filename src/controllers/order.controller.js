import { generateOrderDB } from '../services/orders/generateOrder.js';
import { getCartDB } from '../services/index.js';
import { sendMailGmail } from '../utils/nodemailer.utils.js';
export const generateOrder = async (req, res) => {
    try {
        const { body } = req;
        const cartId = req.params.id;
        const orderState = 'generada';
        const cart = await getCartDB(cartId);
        const userEmail = req.session.user.email;
        const order = {
            items: cart.productos,
            estado: orderState,
            email: userEmail,
            adress: body.adress,
            timeStamp: new Date(),
        };
        const resp = await generateOrderDB(order);
        if (resp) {
            let stringOfProductsName = '';
            let totalBilling = 0;
            order.items.forEach((i) => {
                stringOfProductsName += `${i.nombre},`;
                totalBilling += Number(i.precio);
                console.log(totalBilling);
            });
            console.log(stringOfProductsName);
            sendMailGmail({
                from: process.env.NODEMAILER_GMAIL_ADRESS,
                to: [userEmail],
                subject: 'Orden de compra!',
                text: `N° de orden: ${resp._id}, 
                articulos del pedido: ${stringOfProductsName},
                total de la orden : $ ${totalBilling}
                estado del orden: ${orderState},
                direccion de envio: ${order.adress}
                `,
            });
            res.status(200).send(
                `order generada con exito N° de orden: ${resp._id} <button><a href='/api/products'>seguir comprando</a></button>`
            );
        } else {
            res.status(400).render('layout/error', {
                error: {
                    id: resp,
                    msg: ' error al generar la orden ',
                },
            });
        }
    } catch (error) {
        throw error;
    }
};
