import mongoose from "mongoose";
import express, { response , Router } from 'express';
import noteRouter from "./modules/node-router.js";
import cors from 'cors';
import { connection } from "./modules/connection.js";
const app = express();
let port = 8085;
let hostname = "127.0.0.1";
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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
 
