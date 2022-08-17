import { CartsModel } from '../../models/Cart.model.js';
import '../../configs/db.config.js'

export const deleteAllCartsDB =  async ()=>{
    try {
        const resp = await CartsModel.deleteMany({})
        
        return resp
    } catch (error) {
        console.log(error)
        return error
    }
}