const express = require("express")
const router = express.Router()
const ObjectId = require("mongodb").ObjectId

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

//Product listing for category API

router.get("/catProduct/:catName", async (req, res) => {
    const db = req.app.locals.db
    const { catName } = req.params

    const catCollection = db.collection("category")
    const productList = db.collection("products")

    //First check category exists or not

    let result = await catCollection.findOne({ catName: catName })

    if (!result) {
        res.json({ result: false, status: 404, req: 1, msg: "Category not found" })
        return
    }

    let valve = ObjectId(result._id).toString()

    //Then show products that fall under that category

    productList
        .find({ category: valve })
        .limit(50)
        .sort({ _id: -1 })
        .toArray(function (err, result) {
            if (err) {
                console.log("error occured")
                res.status(400).send("Error fetching listening!")
            } else {
                if (result.length > 0) {
                    res.json({ result: result, status: 200, req: 2, msg: "Category has products" })
                } else {
                    res.json({
                        result: false,
                        status: 404,
                        req: 3,
                        msg: "Category has no products",
                    })
                }
            }
        })
    //res.json({ result: true, msg: "product list" })
})

module.exports = router
