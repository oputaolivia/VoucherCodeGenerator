const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@cluster.mongodb.net/test?retryWrites=true&w=majority";

let obj = {
  name: "",
  department: "",
  gender: "",
  email: "",
  voucherCode: ""
};

let data = [];
let voucher = ["abc","def","dkd"];

function seedData() {
  for(let i = 0; i < voucher.length; i++) {
    let currentObj = {...obj};
    currentObj.voucherCode = voucher[i];
    data.push(currentObj);
  }
}

seedData();
console.log(data);

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const db = client.db("test");
  const collection = db.collection("obj");
  collection.insertMany(data, function(err, res) {
    console.log("Data inserted successfully!");
    client.close();
  });
});