const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
     symbol: String,
     companyName: String,
     image: String,
     currentPrice: Number,
     change: Number,
     percentChange: Number
}, {
    versionKey : false
});


const stockModel = mongoose.model("stocks", stockSchema);


module.exports = {
    stockModel
}


