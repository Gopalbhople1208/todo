import express from "express";
import { connection, collectionName } from "./dbconfig.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.post("/add-Task", async (req, resp) => {
 
    const db = await connection();
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(req.body);

    console.log(result);

    resp.send({
      message: "Task inserted",
      data: result
    });

});


app.get("/", async (req, resp) => {
 
    const db = await connection();
    const collection = db.collection(collectionName);

    const result = await collection.find().toArray();

    console.log(result);

   resp.send({
    message: "basic API",
    success: true,
    data:result
 
  });
});

// app.get("/", (req, resp) => {
 
// });

app.listen(3232, () => {
  console.log("Server running at http://localhost:3232");
});