import {
    getCartDB,
    addProductToCartDB,
    deleteCartDB,
    deleteCartProductDB,
    createCartDB,
} from '../services/index.js';

export const createCart = async (req, res, next) => {
    try {
        const dbResp = await createCartDB();
        if (dbResp) {
            req.session.cartId = dbResp; //envio el cart al cookie
            res.redirect('/api/products');
        } else {
            res.render('layout/error', {
                error: {
                    id: dbResp,
                    msg: 'error en la base de datos al crear el cart',
                },
            });
            throw dbResp;
        }
    } catch (error) {
        next(error);
    }
};

export const getCart = async (req, res, next) => {
    try {
        const cartId = req.params.id;
        const cart = await getCartDB(cartId);

        if (cart) {
            res.status(200).render('layout/cart', { cart });
        } else {
            res.status(500).render('layout/error', {
                error: {
                    id: cart,
                    msg: 'error en la base de datos al crear el cart',
                },
            });
            throw cart;
        }
    } catch (error) {
        next(error);
    }
};

export const addProductToCart = async (req, res, next) => {
    try {
        const cartId = req.params.id;
        const productId = req.params.productId;
        const { amount } = req.body;
        const dbRes = await addProductToCartDB(cartId, productId, amount);
        if (dbRes) {
            res.send(
                `Se agrego con exito el producto con id: ${productId}, <br>
                 <button><a href='/api/products'>seguir comprando</a></button> <br>
                 <button><a href='/api/cart/${cartId}/products'>ver el carrito</a></button>   
                 `
            );
        } else {
            res.render('layout/error', {
                error: {
                    id: dbRes,
                    msg: 'error en la base de datos, no se pudo añadir el producto al cart',
                },
            });
            throw new Error(dbRes);
        }
    } catch (error) {
        next(error);
    }
};
export const deleteCart = (req, res, next) => {
    try {
        const cartId = req.params.id;
        const dbRes = deleteCartDB(cartId);
        if (dbRes === true) {
            res.send(`Carrito con id ${cartId} borrado`);
        } else {
            res.render('layout/error', {
                error: {
                    id: dbRes,
                    msg: 'error en la base de datos, no se encontro el carrito',
                },
            });
        }
    } catch (error) {
        next(error);
    }
};

export const removeProductOnCart = async (req, res, next) => {
    try {
        const cartId = req.params.id;
        const productId = req.params.productId;
        const dbRes = await deleteCartProductDB(cartId, productId);
        if (dbRes) {
            res.send(
                `Producto con id: ${productId} removido con exito del carrito con id: ${cartId}`
            );
        } else {
            res.render('layout/error', {
                error: {
                    id: dbRes,
                    msg: 'error en la base de datos al eliminar el producto del carrito',
                },
            });
            throw dbRes;
        }
    } catch (error) {
        next(error);
    }
};
