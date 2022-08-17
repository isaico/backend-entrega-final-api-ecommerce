import { ProductsModel } from '../../models/Product.model.js';
import '../../configs/db.config.js'

export const readProdDB = async (id)=>{
    try {
        const resp= await ProductsModel.findOne({_id:id}) //retorna null de no encontrar algo
        
        return resp
    } catch (error) {
        console.log(error)
    }
}
