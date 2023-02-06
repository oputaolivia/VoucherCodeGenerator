const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');
const uri = "mongodb+srv://<username>:<password>@cluster.mongodb.net/test?retryWrites=true&w=majority";

const app = express();
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));

app.post('/submit-details', function(req, res) {
  client.connect(err => {
    const db = client.db("test");
    const collection = db.collection("obj");

    collection.findOne({ name: "" }, function(err, result) {
      if (err) throw err;
      if (result) {
        let userName = req.body.name; // get user input for name
        let userDepartment = req.body.department; // get user input for department
        let userGender = req.body.gender; // get user input for gender
        let userEmail = req.body.email; // get user input for email

        result.name = userName;
        result.department = userDepartment;
        result.gender = userGender;
        result.email = userEmail;

        collection.save(result, function(err, res) {
          if (err) throw err;
          console.log("Data updated successfully!");
        });

        // send email to user containing their voucher code
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
          }
        });
    
        let mailOptions = {
          from: 'youremail@gmail.com',
          to: userEmail,
          subject: 'Your Voucher Code',
          text: 'Your voucher code is: ' + result.voucherCode
        };
    
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        client.close();
        res.send("Details submitted successfully!");
      } else {
        console.log("No empty object found.");
        client.close();
        res.send("No empty object found.");
      }
    });
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});