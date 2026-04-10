const express = require('express');
const router = express.Router();
const {
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderStatus,
    createRazorpayOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createOrder)
    .get(protect, admin, getOrders);

router.post('/razorpay', protect, createRazorpayOrder);

router.get('/myorders', protect, getMyOrders);

router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
