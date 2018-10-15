import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: Date.now},
    amount: {type: Number, required: true, default: 0},
    picture: {type: String, required: true, default: '../img/mikasa-pilka.jpg'}
});

export default mongoose.model('Product', Product);
