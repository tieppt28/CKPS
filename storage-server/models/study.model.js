const mongoose = require('mongoose');


const StudyTemplateSchema = new mongoose.Schema({
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
    timestamp: {
        type: Number,
        default: new Date().getTime()
    }
}, {
    versionKey: false
});


module.exports = mongoose.model('StudyTemplate', StudyTemplateSchema);