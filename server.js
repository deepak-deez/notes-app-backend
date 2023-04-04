// const mongoose = require('mongoose');
import mongoose from "mongoose";
import http from "http";

let hostname = "127.0.0.1";
let port = 8085;

async function requestReceived(request) {
  // console.log(request.url);
  if (request.url == "/") {
    const myData = await read({});
    // console.log("myData" , myData);
    // console.log(read({}));
    // return myData;
  } else {
    console.log("not data");
  }
}

const server = http.createServer(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.writeHead(200, { "Content-Type": "application/json" });
  try {
    const result = await requestReceived(request);
    console.log("result", result);
    response.end("result");
  } catch (err) {
    response.end({
      data: "Not Found",
      error: err,
    });
  }
});

server.listen(port, hostname, () => {
  console.log("server is listening at", port);
});

main()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

async function main() {
  //   await mongoose.connect('mongodb://127.0.0.1:27017/test')
  await mongoose.connect(
    "mongodb+srv://deepak:mongo@cluster1.hj2ru6p.mongodb.net/test"
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const schema = new mongoose.Schema(
  {
    notes: String,
  },
  {
    strict: true,
  }
);

const mySchema = mongoose.model("mySchema", schema);

// read({});

//   const data = new mySchema({ name: 'deepak' });
//   console.log(data.name);

// Creating document using create method
// mySchema.collection.insert([{
//     name: 'Customer21',
//     orderCount: 10
// },
// { name: 'Customer31', orderCount: 20 }])
//    .then(result => {
//     console.log(result)
// })

async function create(data) {
  await mySchema.create(data);
  mongoose.connection.close().then(() => {
    console.log("connection closed");
  });
}

// create(weatherData);

async function deleteData(data) {
  await mySchema.deleteOne(data);
  mongoose.connection.close().then(() => {
    console.log("connection closed");
  });
}
async function read(data) {
  //  let db = await mySchema.find(data).then((data)=>{
  //     console.log("data found");
  //     return data;
  //   }).catch((err)=>{
  //     console.log(err);

  // let myData=[];
  const notesData = await mySchema.find(data).then((d) => {
    // console.log(d);
    // myData=d;
    return d;
  });

  console.log(notesData);

  return JSON.stringify(notesData);
}
async function update(oldData, newData) {
  await mySchema.updateOne(oldData, newData);
  mongoose.connection.close().then(() => {
    console.log("connection closed");
  });
}

// mySchema.updateOne()
