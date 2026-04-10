const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Ingredient = require('../models/Ingredient');
const nodemailer = require('nodemailer');

// Mock email functionality for low inventory
const sendLowStockEmail = async (ingredients) => {
    try {
        console.log('--- MOCK EMAIL ---');
        console.log(`To: Admin (admin@pizza.com)`);
        console.log(`Subject: Low Stock Alert`);
        console.log(`The following ingredients are running low:`);
        ingredients.forEach(i => console.log(`- ${i.name} (Stock: ${i.stock})`));
        console.log('------------------');
    } catch (error) {
        console.error('Error sending mock email', error);
    }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const { customPizza, totalAmount, paymentId, paymentStatus } = req.body;

    if (!customPizza || !customPizza.base || !customPizza.sauce || !customPizza.cheese) {
        res.status(400);
        throw new Error('Incomplete pizza setup');
    }

    const order = new Order({
        user: req.user._id,
        customPizza,
        totalAmount,
        paymentId,
        paymentStatus
    });

    const createdOrder = await order.save();

    // Reduce inventory
    const ingredientsToReduce = [
        customPizza.base,
        customPizza.sauce,
        customPizza.cheese,
        ...(customPizza.veggies || [])
    ];

    let lowStockItems = [];
    
    for (const ingId of ingredientsToReduce) {
        const ingredient = await Ingredient.findById(ingId);
        if (ingredient) {
            ingredient.stock -= 1;
            await ingredient.save();

            if (ingredient.stock < ingredient.threshold) {
                lowStockItems.push(ingredient);
            }
        }
    }

    if (lowStockItems.length > 0) {
        await sendLowStockEmail(lowStockItems);
    }

    // Emit event for real-time updates to admin
    const io = req.app.get('io');
    if (io) {
        // Fetch full order details
        const fullOrder = await Order.findById(createdOrder._id)
            .populate('user', 'name email')
            .populate('customPizza.base')
            .populate('customPizza.sauce')
            .populate('customPizza.cheese')
            .populate('customPizza.veggies');
        io.emit('new_order', fullOrder);
    }

    res.status(201).json(createdOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
        .populate('customPizza.base customPizza.sauce customPizza.cheese customPizza.veggies')
        .sort('-createdAt');
    res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate('user', 'id name')
        .populate('customPizza.base customPizza.sauce customPizza.cheese customPizza.veggies')
        .sort('-createdAt');
    res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        
        // Emit event to the specific order's room or user room
        const io = req.app.get('io');
        if (io) {
            io.to(`order_${order._id}`).emit('order_status_update', updatedOrder);
            io.emit('admin_order_update', updatedOrder); // for admin dashboard refresh
        }

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc Mock Razorpay create order (returns dummy id)
// @route POST /api/orders/razorpay
// @access Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    res.json({
        id: `mock_order_${Date.now()}`,
        currency: 'INR',
        amount: amount * 100
    });
});

module.exports = {
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderStatus,
    createRazorpayOrder
};
