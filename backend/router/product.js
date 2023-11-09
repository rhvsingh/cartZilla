const express = require("express")
const router = express.Router()

//Product Listing API

router.get("/productList", (req, res) => {
    const db = req.app.locals.db
    const productList = db.collection("products")
    productList
        .find({})
        .limit(50)
        .sort({ _id: -1 })
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching listening!")
            } else {
                res.json(result)
            }
        })
    //res.json({ "result": true, "msg": "product list" })
})

//Get product list only for registered user

router.get("/products/:key", (req, res) => {
    const db = req.app.locals.db
    let key = req.params.key
    let userCollections = db.collection("user")
    let productsCollections = db.collection("products")

    userCollections
        .find({ akey: key })
        .limit(1)
        .sort({ _id: -1 })
        .toArray(function (err, result) {
            if (err) {
                console.log("Error occured " + err.message)
            } else if (result.length) {
                productsCollections
                    .find({})
                    .limit(50)
                    .sort({ _id: -1 })
                    .toArray(function (err2, result2) {
                        if (err2) {
                            console.log(err2)
                        } else if (result2.length) {
                            res.json({ result: true, found: result2.length, data: result2 })
                        } else {
                            res.json({ result: false, data: [] })
                        }
                    })
            } else {
                res.json({ result: false, msg: "you are not authorized", data: [] })
            }
        })
})

module.exports = router
