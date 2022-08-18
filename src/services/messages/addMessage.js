import { MessagesModel } from "../../models/index.js";
import '../../configs/db.config.js'

export const addMessageDB = async (msj)=>{
    try {
        const resp=await MessagesModel.create(msj)
        return resp
    } catch (error) {
        throw new Error(error)
    }
}
