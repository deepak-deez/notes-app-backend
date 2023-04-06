import mongoose from "mongoose";
// import  mySchema  from "./schema.js";
import express, { response } from 'express';
import cors from 'cors';
const app = express();
let port = 8085;
let hostname = "127.0.0.1";
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log('Example app listening on port 3000!'));

//routes 

app.get('/', async (req, res) => {
  const myData = await read({});
  res.send([{ data: myData }, {
    message: "Notes found!"
  }, { status: 200 }])
});

app.post('/create', async (req, res) => {
  console.log(req.body);
  await create(req.body);
  res.send([{ message: "Note added!" }, { status: 200 }])
});

app.delete('/delete', async (req, res) => {
  await deleteData(req.body)
  res.send([{ message: "Note deleted!" }, { status: 200 }])
})

app.put('/update', async (req, res) => {
  await update({notes : req.body[0]}, {notes : req.body[1]})
  res.send([{ message: 'Note modified!' }, { status: 200 }])
})
 
//routes


//mongoose connection

main()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://deepak:mongo@cluster1.hj2ru6p.mongodb.net/test"
  );
}

//mongoose connection

//schema

const schema = new mongoose.Schema(
  {
    notes: String,
  },
  {
    strict: true,
  }
);

const mySchema = mongoose.model("mySchema", schema);

//schema

//functions

async function create(data) {
  await mySchema.create(data);
}

async function deleteData(data) {
  await mySchema.findOneAndDelete(data);
}

async function read(data) {
  const notesData = await mySchema.find(data).then((myData) => {
    return myData;
  });
  return JSON.stringify(notesData);
}
async function update(oldData, newData) {
  await mySchema.findOneAndUpdate(oldData, newData);
}

//functions