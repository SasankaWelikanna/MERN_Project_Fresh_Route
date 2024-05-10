mongoose = require("mongoose");

const DeclinedSupplySchema = new mongoose.Schema({
  
    fruit : {
        type : String,
        required: true
    },

    subCategory : {
        type : String,
        required: true
    },

    quality : {
        type : String,
        required: true
    },

    quantity : {
        type : Number,
        required: true
    },

    price : {
        type : String,
        required: true
    },

    dateCanBeGiven : {
        type : String,
        required: true
    },
    predictionID : {
        type : String,
        required: true
    },
    supplierName: String,
});

const DeclinedSupply = mongoose.model("DeclinedSupply", DeclinedSupplySchema);

module.exports = DeclinedSupply;