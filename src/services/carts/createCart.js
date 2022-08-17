import { CartsModel } from '../../models/Cart.model.js';
import '../../configs/db.config.js'

//crea el cart y retorna su Id
export const createCartDB = async ()=>{
    try {
        const result = await CartsModel.create({timeStamp: new Date()})
        const cartId = result._id
        
        return cartId.toHexString()
    } catch (error) {
        console.log(error)
        return error
    }
}