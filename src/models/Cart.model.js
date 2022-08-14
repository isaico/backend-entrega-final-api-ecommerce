import mongoose from "mongoose";

const Schema = new mongoose.Schema({
   
    timeStamp:{
        type:String
    }
})
export const CartsModel = mongoose.model('Carts',Schema)