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
      res.send({ id: dbResp });
    } else {
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
      res.send(cart);
    } else {
      const error = new Error(`El carrito con id ${cartId} no existe`);
      error.code = 'CART_NOT_FOUND';
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const productId = req.params.productId;
    const qty = req.body.amount;
    const dbRes = await addProductToCartDB(cartId, productId, qty);
    if (dbRes) {
      res.send(
        `Producto con id ${productId} añadido al carrito con id ${cartId}`
      );
    } else {
      throw dbRes;
    }
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
export const deleteCart = (req, res, next) => {
  try {
    const cartId = req.params.id;
    const dbRes =  deleteCartDB(cartId);
    if (dbRes === true ) {
      res.send(`Carrito con id ${cartId} borrado`);
    } else {
      res.send(`Carrito no encontrado en la base de datos con id ${cartId}`);
    }
  } catch (error) {
    next(error);
  }
};

export const removeProductOnCart = async (req, res, next) => {
  try {
    const  cartId  = req.params.id;
    const  productId  = req.params.productId;
    const dbRes = await deleteCartProductDB(cartId, productId);
    if (dbRes) {
      res.send(
        `Producto con id: ${productId} removido con exito del carrito con id: ${cartId}`
      );
    } else {
      throw dbRes;
    }
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
