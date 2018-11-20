import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Delivery = Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
    icon: { type: String, required: true, default: '/img/delivery/placeholder.png' },
});

export default mongoose.model('Delivery', Delivery);
