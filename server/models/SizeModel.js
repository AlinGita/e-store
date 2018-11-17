import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Size = new Schema({
    name: { type: String, required: true },
    short: { type: String, required: true, default: 'small' }
});

export default mongoose.model('Size', Size);
