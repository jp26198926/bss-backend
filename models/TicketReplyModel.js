const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    ticketId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Ticket' },
    createdAt: {
        type: Date,
        default: () => { return Date.now() }
    },
    name: { type: String, required: true, trim: true },
    email: {type: String,required: true, trim: true }, 
    message: { type: String, required: true, trim: true }
});

const Model = mongoose.model('TicketReply', Schema);

module.exports = Model;