import mongoose from "mongoose";
import { userData } from "../config.js";

export async function connection() {
    await mongoose.connect(
      `mongodb+srv://${userData.userName}:${userData.password}@cluster1.hj2ru6p.mongodb.net/${userData.dbName}`
   ).then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));;
  
  }
  
  