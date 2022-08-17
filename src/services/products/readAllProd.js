import { ProductsModel } from '../../models/Product.model.js';
import '../../configs/db.config.js'

export const readAllProductsDB=async()=>{
    try {
        const resp  = await ProductsModel.find() // retorna array vacio  en caso negativo
       
        return resp
    } catch (error) {
        console.log(error)
    }
}

