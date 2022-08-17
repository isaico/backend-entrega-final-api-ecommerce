import { ProductsModel } from '../../models/Product.model.js';
import '../../configs/db.config.js';

export const deleteProductDB = async (id) => {
    try {
        const resp =await ProductsModel.deleteOne({_id:id})
        
        return resp
    } catch (error) {
        console.log(error)
    }
};
