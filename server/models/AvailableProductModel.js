import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const AvailableProduct = new Schema({
    product: { type: Schema.Types.ObjectId, required: true, ref: 'Product'},
    size: { type: Schema.Types.ObjectId, required: true, ref: 'Size'},
    amount: { type: Number, required: true, default: 0}
})

export default mongoose.model('AvailableProduct', AvailableProduct);
