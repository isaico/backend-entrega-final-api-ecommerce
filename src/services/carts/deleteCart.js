import { CartsModel } from '../../models/Cart.model.js';
import '../../configs/db.config.js'

export const deleteCartDB =  async (cartId)=>{
 try {
     const resp = await CartsModel.deleteOne({_id:cartId})
     if(resp.deletedCount>0) return true
     else return false
     
 } catch (error) {
     console.log(error)
     return  error
 }
}