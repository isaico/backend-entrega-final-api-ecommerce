import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: String,
        required:true
    },
});

export const MessagesModel = mongoose.model('Messages', Schema);
