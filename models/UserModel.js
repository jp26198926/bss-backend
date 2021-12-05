const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    password: String,
    role: { type: mongoose.SchemaTypes.ObjectId, ref: 'Role' },
    status: { type: mongoose.SchemaTypes.ObjectId, ref: 'Status'},
});

const Model = mongoose.model('User', Schema);

module.exports = Model;