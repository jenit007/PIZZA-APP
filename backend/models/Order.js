const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customPizza: {
        base: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
        sauce: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
        cheese: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
        veggies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    },
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Order Received', 'In Kitchen', 'Out for Delivery'], 
        default: 'Order Received' 
    },
    paymentId: { type: String }, // Razorpay payment ID
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
