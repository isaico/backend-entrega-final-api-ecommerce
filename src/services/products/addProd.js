import { ProductsModel } from '../../models/Product.model.js';
import '../../configs/db.config.js'

export const addProductDB=async(product)=>{
    try {
        const resp = await ProductsModel.create(product)
        return resp
    } catch (error) {
        console.log(error)
    }
}
