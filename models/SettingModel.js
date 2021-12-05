const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    value: { type: String }    
});

const Model = mongoose.model('Setting', Schema);

module.exports = Model;