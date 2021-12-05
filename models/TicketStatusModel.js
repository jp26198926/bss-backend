const mongoose = require('mongoose');

const Schema = mongoose.Schema({    
    name: {
        type: String,
        required: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    }
});

const Model = mongoose.model('TicketStatus', Schema);

module.exports = Model;