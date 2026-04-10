const express = require('express');
const router = express.Router();
const {
    getIngredients,
    createIngredient,
    updateIngredient
} = require('../controllers/inventoryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getIngredients)
    .post(protect, admin, createIngredient);

router.route('/:id')
    .put(protect, admin, updateIngredient);

module.exports = router;
