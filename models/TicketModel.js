const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  ticketNo: {
    type: String,
    required: true,
    trim: true,
    default: () => {
      return Date.now().toString();
    },
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  },
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: "TicketCategory" },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  assignedTech: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    default: null,
  },
  status: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "TicketStatus",
    default: "61ada32dd43e6ce8fbf08b28",
  },
});

const Model = mongoose.model("Ticket", Schema);

module.exports = Model;
