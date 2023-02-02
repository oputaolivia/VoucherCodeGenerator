const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    voucherCode: {
      type: mongoose.Schema.Types.Mixed,
    },
    voucherStatus: {
      type: Boolean,
      default: false,
    }
  });
  
  const Voucher = mongoose.model("voucher", voucherSchema);
  
  module.exports = Voucher;