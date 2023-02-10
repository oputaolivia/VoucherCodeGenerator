const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const nodemailer = require("nodemailer");
 require("dotenv").config();
const uri = process.env.MONGODB_URI;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


const client = new MongoClient(uri, { useNewUrlParser: true });
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.post("/submit-details", function (req, res) {
  client.connect((err) => {
    const db = client.db("AzureVouchers");
    const collection = db.collection("users");

    collection.findOne({ name: "" }, function (err, result) {
      if (err) throw err;
      if (result) {
        collection.findOneAndUpdate(
          { name: "" },
          {
            $set: {
              name: req.body.name,
              department: req.body.department,
              gender: req.body.gender,
              email: req.body.email,
            },
          },
          { upsert: false },
          function (err, res) {
            if (err) throw err;
            console.log("Data updated successfully!");
          }
        );

        // send email to user containing their voucher code
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.MAIL_PASS
          }
        });

       let mailOptions = {
          from: process.env.EMAIL,
          to:req.body.email ,
          subject: 'Your Voucher Code',
          text: `
            Hello ${req.body.name},
            It was nice having you at todays session,

            For attending our event you just 
            unlocked an Azure Voucher.
            Your Azure Voucher Code is
            ${result.voucherCode}

            Use the link bellow to activate your voucher:
            https://signup.azure.com/studentverification?offerType=1
           
            Best Regard,
            MLSA FUTO.`
        };

       transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        // client.close();
        res.send("Details submitted successfully!");
      } else {
        console.log("No empty object found.");
        // client.close();
        res.send("No empty object found.");
      }
    });
  });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
