const mongoose = require('mongoose');

const Schema = mongoose.Schema({    
    subject: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    message: { type: String, required: true, trim: true },
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true},
    createdAt: {
        type: Date,
        default: () => { return Date.now() }
    },
});

const Model = mongoose.model('Knowledgebase', Schema);

module.exports = Model;