const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
      type: String,
    },
    email: {
      type: mongoose.Schema.Types.Mixed,
    },
    department: {
        type: String,
      },
  });
  
  const User = mongoose.model("user", userSchema);
  
  module.exports = User;