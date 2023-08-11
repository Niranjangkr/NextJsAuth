import mongoose from 'mongoose'

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("connected", () => console.log("Successfully connected"));
        connection.on("error", (err) => console.log("Mongodb connection error "+err));
        // process.exit();
    } catch (error) {
        console.log("something went wrong")
        console.log(error)
    }
}


/**
const mongoose = require('mongoose')

const connectDB = (uri) =>{
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("connection start")).catch((error) => console.log(error))
}

module.exports = connectDB */