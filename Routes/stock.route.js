const express = require("express");
const { auth } = require("../Middleware/auth.middleware");
const { stockModel } = require("../Model/stock.model");

const stockRouter = express.Router();


stockRouter.get("/", async(req, res) => {
    try{
        const stocks = await stockModel.find();
        res.status(200).json(stocks);
    }catch(err){
        res.status(400).json({error:err});
    }
})

stockRouter.use(auth);

stockRouter.post("/add", async(req,res) => {
    try{
     const newStock = new stockModel(req.body);
     await newStock.save();
     res.status(200).json({msg: "New stock has been added", stock: req.body})
    }catch(err){
        res.status(400).json({error:err})
    }
})

stockRouter.patch("/update/:id", async(req,res) => {
    try{ 
     const id = req.params.id;
     const stock = await stockModel.find({_id:id});
     if(stock){
        await stockModel.findByIdAndUpdate({_id:id}, {...req.body});
        res.status(200).json({msg: "Stock has been updated"});
     }else{
        res.status(400).json({msg: "Stock not found"});
     }
    }catch(error){
        res.status(200).json({error})
    }
})


stockRouter.delete("/delete/:id", async(req,res) => {
    try{
        const id = req.params.id;
        const stock = await stockModel.find({_id:id});
        if(stock){
           await stockModel.findByIdAndDelete({_id:id});
           res.status(200).json({msg: "Stock has been deleted"});
        }else{
           res.status(400).json({msg: "Stock not found"});
        }
    }catch(error){
        res.status(400).json({error});
    }
})






module.exports = {
    stockRouter
}