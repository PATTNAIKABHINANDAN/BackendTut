import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';

import express from "express"
const app=express()

connectDB().catch(err => console.log(err));

async function connectDB() {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error",(error)=>{
        console.warn("ERR -- ",error);
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
    })
}
