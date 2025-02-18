import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    income: {
        type: Number,
        required: true,
        unique: false
    },
    monthlyExpenditure: {
        type: Number,
        required: true,
        unique: false
    },
    riskTolerance: {
        type: String,
        enum: ['Very high', 'High', 'Medium', 'Low', 'Very low'],
        required: true,
        unique: false
    },
    calculatedResults: {
        mutualFunds: Number,
        securities: Number,
        futures: Number,
        bonds: Number
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
