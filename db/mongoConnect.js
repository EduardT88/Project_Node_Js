const mongoose = require('mongoose');
require("dotenv").config(); 

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/project_node_js');
  // await mongoose.connect(process.env.MONGO_CONNECT);
  console.log("mongo connect project_node_js");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}