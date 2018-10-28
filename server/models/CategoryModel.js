import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Category = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' }
})

export default mongoose.model('Category', Category);