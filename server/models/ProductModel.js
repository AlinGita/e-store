import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true, default: ''},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: Date.now},
    pictures: {type: Array, required: true, default: ['/img/mikasa-pilka.jpg']},
    features: {type: Array, default: []},
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category'},
    availability: [{ type: Schema.Types.ObjectId, required: true, ref: 'AvailableProduct'}]
});

export default mongoose.model('Product', Product);
