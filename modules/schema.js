import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
      notes: String,
    },
    {
      strict: true,
    }
  );
  
 const mySchema = mongoose.model("mySchema", schema);
export default mySchema;
