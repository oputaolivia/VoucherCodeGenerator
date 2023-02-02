const Voucher = require('../models/voucherModel');

const getVoucher = async (req, res) => {
    try {
      const voucher = await Voucher.findOneAndReplace(
        {
          isUsed: false
        },
        {
          isUsed: true
        }
       );
  
      res.status(200).send({
        data: {
            voucher: voucher.voucherCode
        },
        message: "Voucher Sent",
        status: 0,
      });
    } catch (err) {
      res.status(500).send({ data: {}, error: err.message, status: 1 });
    }
  };
  
  const getVouchers = async (req, res) => {
    try {
      const vouchers = await Voucher.find({});
      res.status(200).send({
        data: vouchers,
        message: "All vouchers",
        status: 0,
      });
    } catch (err) {
      res.status(500).send({ data: {}, error: err.message, status: 1 });
    }
  };
  
  
  module.exports = {
    getVouchers,
    getVoucher,
  };
  