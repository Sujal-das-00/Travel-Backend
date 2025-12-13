import mongoose, { mongo } from "mongoose";
const URL = 'mongodb://localhost:27017/Travel_Agency_db';
mongoose.connect(URL)
const db = mongoose.connection;
db.on("connected",() =>{
    console.log("database connection established")
})
db.on("error",()=>{
    console.log("An error occured to connect the database");
})
db.on("disconnect",()=>{
    console.log("Database Connection Disconnected ");
})

export default db;