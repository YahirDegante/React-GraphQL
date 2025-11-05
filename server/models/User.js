import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    isMarried: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);