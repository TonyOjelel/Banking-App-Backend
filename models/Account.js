const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  // Define account schema fields
  // For example:
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  // ... other fields
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
