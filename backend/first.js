// import express from "express";
// import 'dotenv/config';
// import { OAuth2Client } from 'google-auth-library';
// import { connection, collectionName } from "./dbconfig.js";
// import cors from "cors";
// import { ObjectId } from "mongodb";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import cookieParser from 'cookie-parser';

// const app = express();

// app.use(express.json());

// app.use(cors());



// // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // // --- Google Login Route ---
// // app.post('/google-login', async (req, res) => {
// //   const { token } = req.body;

// //   try {
// //     const ticket = await client.verifyIdToken({
// //       idToken: token,
// //       audience: process.env.GOOGLE_CLIENT_ID,
// //     });

// //     const payload = ticket.getPayload();
// //     const email = payload.email;
// //     const name = payload.name;

// //     const db = await connection();
// //     const usersCollection = db.collection("users");

// //     // Check if user exists
// //     let user = await usersCollection.findOne({ email });

// //     if (!user) {
// //       // Create new user if not exists
// //       const result = await usersCollection.insertOne({ name, email, password: "" });
// //       user = { _id: result.insertedId, name, email };
// //     }

// //     // Issue JWT
// //     const tokenJWT = jwt.sign(
// //       { email: user.email, userId: user._id },
// //       process.env.JWT_SECRET || "defaultsecret",
// //       { expiresIn: "5d" }
// //     );

// //     res.json({ success: true, name: user.name, email: user.email, token: tokenJWT });
// //   } catch (err) {
// //     console.error("Google login error:", err);
// //     res.status(401).json({ success: false, message: 'Invalid Google token' });
// //   }
// // });








// const client = new OAuth2Client("577348361922-tqsr025ee745amsbjbp7cjrn43omfs3o.apps.googleusercontent.com");

// app.post("/google-login", async (req, res) => {
//   try {
//     const { token } = req.body;

//     // Verify token with Google
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: "577348361922-tqsr025ee745amsbjbp7cjrn43omfs3o.apps.googleusercontent.com",
//     });

//     const payload = ticket.getPayload();
//     const { email, name, sub: googleId } = payload;

//     // Save user to DB if not exists
//     const db = await connection();
//     const usersCollection = db.collection("users");

//     let user = await usersCollection.findOne({ email });
//     if (!user) {
//       await usersCollection.insertOne({ name, email, googleId });
//     }

//     return res.json({ success: true, email, name });

//   } catch (err) {
//     console.error("Google login error:", err);
//     return res.status(500).json({ success: false, message: "Google login failed" });
//   }
// });



// //----login route---

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Basic validation
//     if (!email || !password)
//       return res.status(400).json({ success: false, message: "Email and password required" });

//     const db = await connection();
//     const usersCollection = db.collection("users");

//     // Find user by email
//     const user = await usersCollection.findOne({ email });
//     if (!user)
//       return res.status(401).json({ success: false, message: "Invalid email or password" });

//     // Compare password with hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ success: false, message: "Invalid email or password" });

//     // Generate JWT token
//     const token = jwt.sign(
//       { email: user.email, userId: user._id },
//       process.env.JWT_SECRET || "defaultsecret",
//       { expiresIn: "5d" }
//     );

//     return res.status(200).json({ success: true, message: "Login successful", token });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });





















// // --- Signup route ---
// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ success: false, message: "Email and password required" });

//     const db = await connection();
//     const usersCollection = db.collection("users");

//     const existingUser = await usersCollection.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await usersCollection.insertOne({ name, email, password: hashedPassword });

//     const token = jwt.sign({ email, userId: result.insertedId }, "gopal", { expiresIn: "5d" });

//     return res.status(201).json({ success: true, message: "Signup done", token });
//   } catch (err) {
//     console.error("Signup error:", err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });



// // app.post("/add-Task", async (req, resp) => {
// //   const db = await connection();
// //   const collection = db.collection(collectionName);

// //   const result = await collection.insertOne(req.body);

// //   console.log(result);

// //   resp.send({
// //     message: "Task inserted",
// //     data: result,
// //   });
// // });

// app.post("/add-task", async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     if (!title || !description) {
//       return res.status(400).json({ success: false, message: "Title and description required" });
//     }

//     const db = await connection();
//     const collection = db.collection("tasks");

//     const result = await collection.insertOne({
//       title,
//       description,
//       createdAt: new Date(),
//     });

//     return res.status(201).json({ success: true, message: "Task added", data: result });
//   } catch (err) {
//     console.error("Add Task error:", err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });


// app.get("/", async (req, resp) => {
//   const db = await connection();
//   const collection = db.collection(collectionName);

//   const result = await collection.find().toArray();

//   console.log(result);

//   resp.send({
//     message: "basic API",
//     success: true,
//     data: result,
//   });
// });
// app.delete("/deleteTask/:id", async (req, resp) => {
//   try {
//     const db = await connection();
//     const collection = db.collection(collectionName);
//     const id = req.params.id;

//     const result = await collection.deleteOne({ _id: new ObjectId(id) });
//     console.log(result);

//     if (result.deletedCount === 1) {
//       resp.send({ success: true, message: "Task deleted successfully" });
//     } else {
//       resp.status(404).send({ success: false, message: "Task not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     resp.status(500).send({ success: false, message: "Delete failed" });
//   }
// });

// app.get("/task/:id", async (req, resp) => {
//   const db = await connection();
//   const collection = db.collection(collectionName);

//   const result = await collection.findOne({
//     _id: new ObjectId(req.params.id),
//   });

//   resp.send({
//     success: true,
//     data: result,
//   });
// });

// app.put("/updateTask/:id", async (req, resp) => {
//   try {
//     const db = await connection();
//     const collection = db.collection(collectionName);
//     const id = req.params.id;

//     console.log("Updating task ID:", id);
//     console.log("Update data:", req.body);

//     const result = await collection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: req.body }, // ← IMPORTANT
//     );

//     if (result.modifiedCount === 1) {
//       resp.send({ success: true, message: "Task updated successfully" });
//     } else {
//       resp
//         .status(404)
//         .send({ success: false, message: "Task not found or data unchanged" });
//     }
//   } catch (err) {
//     console.error("Update error:", err);
//     resp.status(500).send({ success: false, message: "Update failed" });
//   }
// });









// //  const saltRounds = 10;


// //  app.post("/signup", async (req, resp) => {
// //    const userData = req.body;

// //    if (userData.email && userData.password) {
// //          const db = await connection();
// //          const collection = db.collection("users");

// //          const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

// //          const newUser = {
// //            email: userData.email,
// //            password: hashedPassword,
// //          };

// //          const result = await collection.insertOne(newUser);

// //          if (result) {
// //            jwt.sign(  { email: newUser.email },"gopal", { expiresIn: "5d" }, (error, token) => {
// //                resp.send({
// //                  success: true,
// //                  message: "Signup Done",
// //                  token,
// //                });
// //              }
// //            );
// //          } else {
// //            resp.send({
// //              success: false,
// //              message: "Signup not successful",
// //                        });
// //     }
// //        }
// //      });







// // app.get("/login",(req,resp)=>{

// //  });

// app.listen(3232, () => {
//   console.log("Server running at http://localhost:3232");
// });












import express from "express";
import 'dotenv/config';
import { OAuth2Client } from 'google-auth-library';
import { connection, collectionName } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

const googleClient = new OAuth2Client(
  "577348361922-tqsr025ee745amsbjbp7cjrn43omfs3o.apps.googleusercontent.com"
);

// ✅ Google Login
app.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: "577348361922-tqsr025ee745amsbjbp7cjrn43omfs3o.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;
    const db = await connection();
    const usersCollection = db.collection("users");
    let user = await usersCollection.findOne({ email });
    if (!user) {
      await usersCollection.insertOne({ name, email, googleId });
    }
    return res.json({ success: true, email, name });
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(500).json({ success: false, message: "Google login failed" });
  }
});

// ✅ Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });
    const db = await connection();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "5d" }
    );
    return res.status(200).json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });
    const db = await connection();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await usersCollection.insertOne({ name, email, password: hashedPassword });
    const token = jwt.sign(
      { email, userId: result.insertedId },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "5d" }
    );
    return res.status(201).json({ success: true, message: "Signup done", token });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Add Task
app.post("/add-task", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json({ success: false, message: "Title and description required" });
    const db = await connection();
    const collection = db.collection("tasks");
    const result = await collection.insertOne({ title, description, createdAt: new Date() });
    return res.status(201).json({ success: true, message: "Task added", data: result });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);
    const result = await collection.find().toArray();
    res.json({ message: "Tasks fetched", success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
});

// ✅ Get Single Task
app.get("/task/:id", async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
});

// ✅ Update Task
app.put("/updateTask/:id", async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.modifiedCount === 1)
      res.json({ success: true, message: "Task updated successfully" });
    else
      res.status(404).json({ success: false, message: "Task not found or unchanged" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

// ✅ Delete Task
app.delete("/deleteTask/:id", async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 1)
      res.json({ success: true, message: "Task deleted successfully" });
    else
      res.status(404).json({ success: false, message: "Task not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

// ✅ Export for Vercel (NO app.listen)
export default app;