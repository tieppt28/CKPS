const mongoose = require('mongoose');
const chartCategory = require('../enum/chart.cartegory.enum');

const ChartsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
    },
    ownerSource: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    resolution: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [chartCategory.Ticker, chartCategory.Default]
    },
    timestamp: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
});


module.exports = mongoose.model('Charts', ChartsSchema);