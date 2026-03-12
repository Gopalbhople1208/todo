import express from "express";
import { connection, collectionName } from "./dbconfig.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.post("/add-task", async (req, resp) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(req.body);

    console.log(result);

    resp.send({
      message: "Task inserted",
      data: result
    });
  } catch (error) {
    console.error(error);
    resp.status(500).send({ error: "Failed to insert task" });
  }
});

app.get("/", (req, resp) => {
  resp.send({
    message: "basic API",
    success: true
  });
});

app.listen(3232, () => {
  console.log("Server running at http://localhost:3232");
});