import { Router } from "express";
// import { userData } from "../config.js";
import { create, deleteData, read, update } from "./functions.js";

const nodeRouter = Router();

nodeRouter.get("/", async (req, res , next) => {
  try{
    const myData = await read({});
  res.send(
    JSON.stringify({ data: myData ,
   message: "Notes found!" ,
    status: 200 })
  );
  }
  catch(error){
    next(error)
  }
});

nodeRouter.post("/create", async (req, res, next) => {
  // console.log(req.body);
  await create(req.body);
  try{
    res.send(
      JSON.stringify({
        message: "Note added!",
        status: 200,
        data: null,
      })
    );
  }
  catch(error){
    next(error)
  }
});

nodeRouter.delete("/delete", async (req, res, next) => {
  await deleteData(req.body);
  try{
    res.send(
      JSON.stringify({
        message: "Note deleted!",
        status: 200,
        data: null,
      })
      
      );
  }
  catch(error){
    next(error)
  }
});

nodeRouter.put("/update", async (req, res, next) => {
  await update({ notes: req.body[0] }, { notes: req.body[1] });
  try{
    res.send(
      JSON.stringify({
        message: "Note updated!",
        status: 200,
        data: null,
      })
      );
  }
  catch(err){
    next(error)
  }
});

export default nodeRouter;
