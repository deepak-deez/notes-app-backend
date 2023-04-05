// const mongoose = require('mongoose');
import mongoose from "mongoose";
// import http from "http";
import express from 'express';
import cors from 'cors';
const app = express();
let port = 8085;
let hostname = "127.0.0.1";
app.use(express.json());
app.use(cors());


app.listen(port, () => console.log('Example app listening on port 3000!'));



async function requestReceived(request) {
  // console.log(request.url);
  if (request.url == "/") {
    const myData = read({});
    // console.log("myData" , myData);
    // console.log(read({}));
    return await myData;
  }
  else if (request.url == "/create") {
    request.on('data', )
    // console.log(request.body);
    return "yes";
  }
  else {
    console.log("not data");
  }
}

app.get('/', async(req, res) => {
  const myData = await read({});
  res.send(myData)
});

app.post('/create', async(req, res) => {
 console.log(req.body);
 await create(req.body);
 res.send({"body" : "Data sent!"})
});

app.delete('/delete', async(req, res) => {
  // await deleteData(req.body);
  res.send("DELETE Request Called" )
})

app.put('/update', async(req, res) => {
  // console.log(req.body);
  await update(req.body[0], req.body[1])
  res.send('Got a PUT request at /user')
})

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
  // mongoose.connection.close().then(() => {
  //   console.log("connection closed");
  // });
}

// create({notes:"I am a developer"});

async function deleteData(data) {
  await mySchema.deleteOne(data);
  // mongoose.connection.close().then(() => {
  //   console.log("connection closed");
  // });
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
  // mongoose.connection.close().then(() => {
  //   console.log("connection closed");
  // });
}

// update({"notes": "I am a boy"} , {"notes": "I did it"})
// mySchema.updateOne()
