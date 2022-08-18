import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    items: {
        type: Object,
        required: true,
    },
    estado: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    adress: {
        type:String,
        required:true,
    },
    timeStamp: {
        type: String,
    },
});
export const OrderModel = mongoose.model('Orders', Schema);
