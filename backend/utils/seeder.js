const mongoose = require("mongoose");
const { vouchers } = require("../data/voucher");
const User = require("../models/userModel");
const Voucher = require("../models/voucherModel");
import connectDB from "../config/db";
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const importData = async ()=>{
    try{
        const createVoucher = await Voucher.insertMany(vouchers);
        res.status(200).send({
            message: "Imported vouchers",
            status: 0,
          })
          process.exit();
        } catch (err) {
          res.status(500).send({ data: {}, error: err.message, status: 1 });
          process.exit(1)
        }
    }
