// created only to use default data whenever something is to be tested ...



const mongoose = require("mongoose");
main()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/studentdetails");
}

const Detail= require("./models/details.js");

// Mock data
let data = [
    { stid: 1, name: 'John Doe', email: 'john@example.com' },
    { stid: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  Detail.insertMany(data);