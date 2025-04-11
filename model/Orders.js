const { mongoose } = require("mongoose");

const orderschema=new mongoose.Schema({
    patientName:String,
    gstno:String,
    dln:String,
    gender:String,
    address:String ,
    contact:String ,
    totalSum:String,
    paymentMethod:String ,
    billtime:String ,
    selectedItems:Array
})

module.exports=mongoose.model("orders",orderschema)