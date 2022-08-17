import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    items: {
        type: Object,
        required: true,
    },
    estado: {
        type: String,
    },
    timeStamp: {
        type: String,
    },
});
export const OrderModel = mongoose.model('Orders', Schema);
