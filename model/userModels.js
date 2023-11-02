import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    date: {
        type: String,
        default: Date.now
    }
});

export default model('User', userSchema);
