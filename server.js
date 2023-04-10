import mongoose from "mongoose";
// import  mySchema  from "./schema.js";
import express, { response , Router } from 'express';
// import { userData } from "./config.js";
import noteRouter from "./modules/node-router.js";
import cors from 'cors';
import { connection } from "./modules/connection.js";
const app = express();
let port = 8085;
let hostname = "127.0.0.1";
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//routes 
connection()
app.use(noteRouter)


app.use((req, res, next)=> {
  next(new Error('Page not found'))
})

app.use((error, req, res, next)=>{
  if(error){
    res.send({
      data: null,
      message: error.message, 
      success: false
    })
  }
})
 
//routes


//mongoose connection


// async function connection() {
//   await mongoose.connect(
//     `mongodb+srv://${userData.userName}:${userData.password}@cluster1.hj2ru6p.mongodb.net/${userData.dbName}`
//  ).then(() => {
//   console.log("connected");
// })
// .catch((err) => console.log(err));;

// }


// connection();
  

//mongoose connection

//schema

// const schema = new mongoose.Schema(
//   {
//     notes: String,
//   },
//   {
//     strict: true,
//   }
// );

// const mySchema = mongoose.model("mySchema", schema);

//schema

//functions

// async function create(data) {
//   await mySchema.create(data);
// }

// async function deleteData(data) {
//   await mySchema.findOneAndDelete(data);
// }

// async function read(data) {
//   const notesData = await mySchema.find(data).then((myData) => {
//     return myData;
//   });
//   return JSON.stringify(notesData);
// }
// async function update(oldData, newData) {
//   await mySchema.findOneAndUpdate(oldData, newData);
// }



//functions