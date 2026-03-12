import express from "express";
// first.js
import { connection } from "./dbconfig.js"; // remove collectionName
//import { connection, collectionName } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    data: result,
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
    data: result,
  });
});
app.delete("/deleteTask/:id", async (req, resp) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);
    const id = req.params.id;

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(result);

    if (result.deletedCount === 1) {
      resp.send({ success: true, message: "Task deleted successfully" });
    } else {
      resp.status(404).send({ success: false, message: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ success: false, message: "Delete failed" });
  }
});

app.get("/task/:id", async (req, resp) => {
  const db = await connection();
  const collection = db.collection(collectionName);

  const result = await collection.findOne({
    _id: new ObjectId(req.params.id),
  });

  resp.send({
    success: true,
    data: result,
  });
});

app.put("/updateTask/:id", async (req, resp) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);
    const id = req.params.id;

    console.log("Updating task ID:", id);
    console.log("Update data:", req.body);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }, // ← IMPORTANT
    );

    if (result.modifiedCount === 1) {
      resp.send({ success: true, message: "Task updated successfully" });
    } else {
      resp
        .status(404)
        .send({ success: false, message: "Task not found or data unchanged" });
    }
  } catch (err) {
    console.error("Update error:", err);
    resp.status(500).send({ success: false, message: "Update failed" });
  }
});









 const saltRounds = 10;


 app.post("/signup", async (req, resp) => {
   const userData = req.body;

   if (userData.email && userData.password) {
         const db = await connection();
         const collection = db.collection("users");

         const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

         const newUser = {
           email: userData.email,
           password: hashedPassword,
         };

         const result = await collection.insertOne(newUser);

         if (result) {
           jwt.sign(  { email: newUser.email },"gopal", { expiresIn: "5d" }, (error, token) => {
               resp.send({
                 success: true,
                 message: "Signup Done",
                 token,
               });
             }
           );
         } else {
           resp.send({
             success: false,
             message: "Signup not successful",
                       });
    }
       }
     });







// app.get("/login",(req,resp)=>{

//  });

app.listen(3232, () => {
  console.log("Server running at http://localhost:3232");
});
