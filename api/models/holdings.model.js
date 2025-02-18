// models/Holdings.js
import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchasePrice: { type: Number, required: true } 
}, { _id: false }); 

const HoldingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  stocks: [StockSchema],
}, { timestamps: true }); 

const Holdings = mongoose.model('Holdings', HoldingsSchema);
export default Holdings;
