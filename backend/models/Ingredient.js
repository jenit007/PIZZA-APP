const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['base', 'sauce', 'cheese', 'veggie', 'meat'], required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 100 },
    threshold: { type: Number, required: true, default: 20 },
    image: { type: String } // optional URL for the ingredient image
}, { timestamps: true });

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
