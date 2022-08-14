import { UserModel } from "../../models/User.model.js";
import '../../configs/db.config.js'

export const createUserDB = async(user)=>{
    try {
        const resp = await UserModel.create(user)
        console.log(resp,"respuesta de la base de datos ")
        return resp
    } catch (error) {
        throw new Error(error)
    }

}