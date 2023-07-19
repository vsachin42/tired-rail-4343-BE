const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.route");
const { stockRouter } = require("./Routes/stock.route");
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/stocks", stockRouter);


app.listen(process.env.PORT, async() => {
    try{
       await connection;
       console.log("Connected to the DB");
       console.log(`Running at ${process.env.PORT} port`);
    }catch(err){
        console.log(err);
    }
})