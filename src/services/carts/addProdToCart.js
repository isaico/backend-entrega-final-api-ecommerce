import '../../configs/db.config.js';
import { Cart_items } from '../../models/Cart-items.model.js';
import { readProdDB } from '../products/readProd.js';

export const addProductToCartDB = async (cartId,productId,qty) => {

  try {
    const product = await readProdDB(productId)
    const resp = await Cart_items.create(
      {
       cart_id: cartId,
       product_id:productId,
       product:product,
       quantity:qty

      });
      console.log(resp)
    return resp;                
  } catch (error) {
      console.log(error)
      return error
  }
};
