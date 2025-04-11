const { mongoose } = require("mongoose");

const productschema=new mongoose.Schema({
    productname:String,
    price:String,
    stock:String,
    mrp:String,
    batch:String,
    hsn:String,
    exp:String,
    gst:String,

})

module.exports=mongoose.model("allproducts",productschema)