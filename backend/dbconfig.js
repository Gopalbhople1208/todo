

//  import { MongoClient } from "mongodb";

//  const url = "mongodb://localhost:27017";
 

//  const dbName = "node";

//  export const collectionName = "tasks";

//  const client = new MongoClient(url);

//  export const connection = async () => {
//    const connect = await client.connect();
//    console.log("MongoDB connected successfully");
//    return connect.db(dbName);
//  };





// import { MongoClient } from "mongodb";

// // ✅ Works locally AND on Vercel
// const url = process.env.MONGODB_URI || "mongodb://localhost:27017";
// const dbName = "node";

// export const collectionName = "tasks";

// const client = new MongoClient(url);

// export const connection = async () => {
//   await client.connect();
//   console.log("MongoDB connected successfully");
//   return client.db(dbName);
// };




 import { MongoClient } from "mongodb";

 const url = "mongodb://localhost:27017";
 

 const dbName = "node";

 export const collectionName = "tasks";

 const client = new MongoClient(url);

 export const connection = async () => {
   const connect = await client.connect();
   console.log("MongoDB connected successfully");
   return connect.db(dbName);
 };