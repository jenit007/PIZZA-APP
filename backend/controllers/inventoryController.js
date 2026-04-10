const asyncHandler = require('express-async-handler');
const Ingredient = require('../models/Ingredient');

// @desc    Get all ingredients
// @route   GET /api/inventory
// @access  Public
const getIngredients = asyncHandler(async (req, res) => {
    const ingredients = await Ingredient.find({});
    res.json(ingredients);
});

// @desc    Create new ingredient
// @route   POST /api/inventory
// @access  Private/Admin
const createIngredient = asyncHandler(async (req, res) => {
    const { name, type, price, stock, threshold, image } = req.body;

    const ingredient = new Ingredient({
        name,
        type,
        price,
        stock,
        threshold,
        image
    });

    const createdIngredient = await ingredient.save();
    res.status(201).json(createdIngredient);
});

// @desc    Update ingredient (including stock)
// @route   PUT /api/inventory/:id
// @access  Private/Admin
const updateIngredient = asyncHandler(async (req, res) => {
    const { name, type, price, stock, threshold, image } = req.body;

    const ingredient = await Ingredient.findById(req.params.id);

    if (ingredient) {
        ingredient.name = name || ingredient.name;
        ingredient.type = type || ingredient.type;
        ingredient.price = price || ingredient.price;
        ingredient.stock = stock !== undefined ? stock : ingredient.stock;
        ingredient.threshold = threshold || ingredient.threshold;
        ingredient.image = image || ingredient.image;

        const updatedIngredient = await ingredient.save();
        res.json(updatedIngredient);
    } else {
        res.status(404);
        throw new Error('Ingredient not found');
    }
});

module.exports = {
    getIngredients,
    createIngredient,
    updateIngredient
};
