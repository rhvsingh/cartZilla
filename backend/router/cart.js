const express = require("express")
const router = express.Router()
const uuid = require("uuid")

//addCart with userId

router.post("/addCart/:akey", (req, res) => {
    const db = req.app.locals.db
    let akey = req.params.akey
    let pid = req.body.pid
    let qty = req.body.qty
    let cId = uuid.v4()

    const userCollection = db.collection("user")
    const cartCollection = db.collection("cart")
    const productsCollection = db.collection("products")

    if (qty == -1 || qty == 1) {
        userCollection
            .find({ akey: akey })
            .limit(1)
            .sort({ _id: -1 })
            .toArray((err4, result4) => {
                if (err4) {
                    console.log(err4)
                } else if (result4.length) {
                    let email = result4[0].email
                    productsCollection
                        .find({ pid: pid })
                        .limit(1)
                        .sort({ _id: -1 })
                        .toArray((err, result) => {
                            if (err) {
                                console.log(err.message)
                            } else if (result.length) {
                                let price = result[0].price.toFixed(2)
                                let discount = result[0].discount
                                let data = {
                                    email: email,
                                    pid: pid,
                                    qty: qty,
                                    cId: cId,
                                    discount: discount,
                                }

                                cartCollection
                                    .find({ pid: pid, email: email })
                                    .limit(1)
                                    .sort({ _id: -1 })
                                    .toArray((err2, result2) => {
                                        if (err2) {
                                            console.log(err2.message)
                                        } else if (result2.length) {
                                            let newQty = result2[0].qty + qty
                                            if (newQty > 0) {
                                                cartCollection.updateOne(
                                                    { pid: pid, email: email },
                                                    { $set: { qty: newQty, price: price } },
                                                    (err3, result3) => {
                                                        if (err3) {
                                                            console.log(err.message)
                                                        } else {
                                                            res.json({
                                                                result: true,
                                                                msg: "Cart Updated",
                                                            })
                                                        }
                                                    }
                                                )
                                            } else {
                                                cartCollection.deleteOne({ pid: pid, email: email })
                                                res.json({ result: true, msg: "Removed from cart" })
                                            }
                                        } else {
                                            if (qty <= 0) {
                                                res.json({
                                                    result: false,
                                                    msg: "Invalid quantity number. Cart cannot be updated.",
                                                })
                                            } else {
                                                let discountedPrice = (
                                                    price -
                                                    (price / 100) * discount
                                                ).toFixed(2)
                                                data.discountedPrice = discountedPrice
                                                data.price = price
                                                cartCollection.insertOne(data, (err3, result3) => {
                                                    if (err3) {
                                                        console.log(err3.message)
                                                    } else {
                                                        res.json({
                                                            result: true,
                                                            msg: "Added successfully",
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                            } else {
                                res.json({
                                    result: false,
                                    msg: "No product found with this pid",
                                })
                            }
                        })
                } else {
                    res.json({ result: false, msg: "You are not authorized" })
                }
            })
    } else {
        res.json({
            result: false,
            msg: "Invalid quantity number. Alteration in Cart not possible",
        })
    }
})

//Show user's cart

router.get("/showCart/:akey", (req, res) => {
    let akey = req.params.akey
    const db = req.app.locals.db

    const userCollection = db.collection("user")
    const joinCollections = db.collection("cart")

    userCollection
        .find({ akey: akey })
        .limit(1)
        .toArray((err, result) => {
            if (err) {
                console.log(err)
                res.json({ err: err })
            } else if (result.length) {
                let email = result[0].email
                joinCollections
                    .aggregate([
                        {
                            $match: {
                                email: email,
                            },
                        },
                        {
                            $lookup: {
                                from: "products",
                                localField: "pid",
                                foreignField: "pid",
                                as: "productDetails",
                            },
                        },
                    ])
                    .sort({ _id: -1 })
                    .toArray((err, result) => {
                        if (err) {
                            console.log(err.message)
                        } else {
                            for (let i = 0; i < result.length; i++) {
                                result[i].productDetails = result[i].productDetails[0]
                            }
                            res.json({ result: result, statusCode: 200 })
                        }
                    })
            } else {
                res.json({ result: false, msg: "akey not found", statusCode: 404 })
            }
        })
})

//CartCount of user
router.get("/cartCount/:akey", (req, res) => {
    const db = req.app.locals.db
    let akey = req.params.akey
    const userCollection = db.collection("user")
    const cartCollection = db.collection("cart")

    userCollection
        .find({ akey: akey })
        .limit(1)
        .sort({ _id: -1 })
        .toArray((err, result) => {
            if (err) {
                console.log(err.message)
            } else if (result.length) {
                let email = result[0].email
                var cartTotalQty = 0
                var cartTotalCalcPrice = 0
                cartCollection.find({ email: email }).toArray((err2, result2) => {
                    if (err2) {
                        console.log(err.message)
                    } else if (result2.length) {
                        for (let i = 0; i < result2.length; i++) {
                            let price = parseFloat(result2[i].price)
                            let discount = parseInt(result2[i].discount)
                            let qty = parseInt(result2[i].qty)
                            let discountedPrice = price - (price / 100) * discount
                            cartTotalQty = cartTotalQty + qty
                            cartTotalCalcPrice += discountedPrice * qty
                        }
                        res.json({
                            result: true,
                            count: result2.length,
                            totalQty: cartTotalQty,
                            tCalcPrice: cartTotalCalcPrice,
                        })
                    } else {
                        res.json({ result: false, count: null, totalQty: null })
                    }
                })
                //cartCollection.find({}).toArray((err, result) => {})
            } else {
                res.json({ result: false, count: null, totalQty: null })
            }
        })
})

//Cart Delete by user
router.get("/cartDelete/:pid/:akey", (req, res) => {
    const db = req.app.locals.db
    let pid = req.params.pid
    let akey = req.params.akey

    const userCollection = db.collection("user")
    const cartCollection = db.collection("cart")

    userCollection
        .find({ akey: akey })
        .limit(1)
        .sort({ _id: -1 })
        .toArray((err, result) => {
            if (err) console.log(err)
            else if (result.length) {
                let email = result[0].email
                cartCollection.deleteOne({ pid: pid, email: email }, (err2, result2) => {
                    if (err2) {
                        console.log(err2)
                        res.json({ result: false, msg: "Deletion Failed" })
                    } else {
                        res.json({ result: true, msg: "Deletion Successful" })
                    }
                })
            } else {
                res.json({ result: false, msg: "User not found" })
            }
        })
})

module.exports = router
