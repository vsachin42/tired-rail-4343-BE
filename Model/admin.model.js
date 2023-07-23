const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  versionKey: false
});

const adminModel = mongoose.model('admins', adminSchema);

module.exports = adminModel;
