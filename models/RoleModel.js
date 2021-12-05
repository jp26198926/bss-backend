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
    pages: Array
});

const Model = mongoose.model('Role', Schema);

module.exports = Model;