const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter')
require('dotenv').config();
const cors = require('cors');

const password = process.env.DATABASE_PASS;

const PORT = 5000;


const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);


const start = async() =>{
    try{
        app.listen(PORT, ()=>console.log(`Server is on PORT: ${PORT}`));
        await mongoose.connect(`mongodb+srv://yessimkhanuly:${password}@cluster0.rhdxdzx.mongodb.net/?retryWrites=true&w=majority`);
    }catch (e){
        console.log(e);
    }
}


start();