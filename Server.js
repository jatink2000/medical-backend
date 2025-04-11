// import mongoose from "mongoose"
const mongoose = require("mongoose")

express = require("express")
app = express()


// models --------------
const users = require("./model/admin")
const Products = require("./model/Addproduct")
const Orders = require("./model/Orders")


// mongoose -------------
mongoose.connect("mongodb+srv://ravi:lK9TyIyGQeFhSTkk@jatink8059.quqwq.mongodb.net/medical").then(() => {
    console.log("mongo connect")
}).catch((err) => {
    console.log(err)
})


cors = require("cors")
app.use(cors())

// bodyParser---------
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({}))




// signup -------------------
app.post("/signup", (req, res) => {
    let userdata = new users({
        email: req.body.email,
        password: req.body.password,
    })

    let result = userdata.save()

    if (result) {
        res.json({
            status: true,
        })
    }
    else {
        res.json({
            status: false,
        })
    }
})



// login ---------------------

app.get("/login", async (req, res) => {
    let userdata = await users.find({})

    if (userdata) {
        res.json({
            status: true,
            alldata: userdata
        })
    }
    else {
        res.json({
            status: false
        })
    }
})



// addproduct 
app.post("/addproduct", async (req, res) => {
    let allproduct = Products({
        productname: req.body.formData.productname,
        price: req.body.formData.price,
        stock: req.body.formData.stock,
        mrp: req.body.formData.mrp,
        batch: req.body.formData.batch,
        hsn: req.body.formData.hsn,
        exp: req.body.formData.exp,
        gst: req.body.formData.gst,
    })

    let productresult = allproduct.save()

    if (productresult) {
        res.json({
            status: true,
        })
    }
    else {
        res.json({
            status: false,
        })
    }
})




// allproducts----------------

app.get("/allproduct", async (req, res) => {
    let allproduct = await Products.find({})
    if (allproduct) {
        res.json({
            status: true,
            productdata: allproduct
        })
    }
    else {
        res.json({
            status: false,
        })
    }
})



// Orders---------------

app.post("/orders", (req, res) => {
    console.log(req.body)
    let alloreder = Orders({
        patientName: req.body.bill.patientName,
        gstno: req.body.bill.gstno,
        dln: req.body.bill.dln,
        gender: req.body.bill.gender,
        address: req.body.bill.address,
        contact: req.body.bill.contact,
        paymentMethod: req.body.bill.paymentMethod,
        billtime: req.body.time,
        selectedItems: req.body.selectedItems,
        totalSum: req.body.totalSum
    })
    let result = alloreder.save()
    if (result) {
        res.json({
            status: true,
            "msg": "product purchase"
        })
    }
    else {
        res.json({
            status: false,
            "msg": "failed to purchase product"
        })
    }
})




// allorders ------------------------

app.get("/allorders", async (req, res) => {
    let allOrders = await Orders.find({})
    if (allOrders) {
        res.json({
            status: true,
            orderdata: allOrders
        })
    }
    else {
        res.json({
            status: false,
        })
    }
})



// removeorder ---------------

app.post("/removeorder", async (req, res) => {
    let removeitem = await Orders.findOneAndDelete({ _id: req.body.item._id })
    if (removeitem) {
        res.json({
            status: true,
            msg: "Order Deleted.."
        })
    }
    else {
        res.json({
            status: false,
            msg: "failed to Delete Order"
        })
    }
})



// updatedata ----------------
app.post("/updatedata", async (req, res) => {
    let update = await Orders.findOneAndUpdate({ _id: req.body.data._id }, { $set: { patientName: req.body.data.patientName } })


    if (update) {
        res.json({
            status: true,
            "msg": "Update Success"
        })
    }
    else {
        res.json({
            status: false,
            "msg": "cannot Update..."
        })
    }
})


app.listen(8080, () => {
    console.log("server start")
})

app.get("/",(req,res)=>{
    res.json({
        "status":true
    })
})