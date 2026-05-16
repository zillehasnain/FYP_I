const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brandId: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    accentColor: { type: String, default: "#10b981" },
    maxDiscount: { type: Number, default: 15 },
    quizzes: [{
        q: String,
        options: [String],
        correctAnswer: Number
    }]
});

module.exports = mongoose.model('Brand', BrandSchema);