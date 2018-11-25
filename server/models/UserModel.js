import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { saltRounds } from '../config';
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now }
});

User.pre('save', async function(next) {
    try {
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;
        next();
    } catch (e) {
        next(e);
    }
});

export default mongoose.model('User', User);
