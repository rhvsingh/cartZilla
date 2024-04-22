const express = require("express")
const router = express.Router()
const crypto = require("crypto")
const ObjectId = require("mongodb").ObjectId

function generateLimitedUniqueCharacter(length) {
    let randomBytes = crypto.randomBytes(length)
    let uniqueCharacter = randomBytes.toString("hex").substring(0, length)
    return uniqueCharacter
}

const { transporter, htmlContext } = require("../lib/emailTemp")

function addToUserOrders() {}
function orderMail() {}

function fetchUserDetails(db, akey, email) {
    const userCollection = db.collection("user")
    let userData = userCollection.findOne({ akey: akey, email: email })
    return userData
}

function bindOrderID(userDetails, orderDetails) {
    let uniqueCharacter = `order_${generateLimitedUniqueCharacter(
        5
    )}-${generateLimitedUniqueCharacter(10)}`

    let customer_id = ObjectId(userDetails._id).toString()

    const d = new Date()

    let orderedDetails = {
        order_id: uniqueCharacter,
        customer_id: customer_id,
        order_date: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(),
        order_time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        total_amount: parseFloat(orderDetails.totalPrice).toFixed(2),
    }

    return uniqueCharacter
}

async function stockCheck(db, orderDetails) {
    const proCollection = db.collection("products")

    let productCheck = await Promise.all(
        orderDetails.itemsOrdered.map(async (item) => {
            let product = await proCollection.findOne(
                {
                    pid: item.productId,
                    stock: { $lt: parseInt(item.productQty) },
                },
                { projection: { pid: 1, name: 1, stock: 1, _id: 0 } }
            )
            return product
        })
    )

    let againCheck = productCheck.filter((el) => {
        if (el !== null) {
            return el
        }
    })

    if (againCheck.length > 0) {
        return againCheck
    }

    return 0
}

async function stockChange(db, orderDetails) {
    const proCollection = db.collection("products")

    //First check product is in stock or not
    //Then if product is in stock then update product stock
    //else return back instantly without updating any products

    let productUpdate = await Promise.all(
        orderDetails.itemsOrdered.map(async (item) => {
            let productUpdate = await proCollection.updateOne(
                { pid: item.productId },
                { $inc: { stock: -parseInt(item.productQty) } }
            )

            return productUpdate
        })
    )

    let updateCheck = productUpdate.filter((el) => {
        if (el !== null) {
            return el
        }
    })

    if (updateCheck.length > 0) {
        return 1
    }

    return 0
}

function cartClear(db, email) {
    const cartCollection = db.collection("cart")
    let cartData = cartCollection.deleteMany({ email: email })
    return cartData
    //but it is not being checked for success or failure.
    //The function should return a proper response indicating whether the cart was successfully cleared or not.
}

//User Register API

router.post("/checkoutProcess", async (req, res) => {
    const db = req.app.locals.db
    const data = req.body

    //Checking user details
    let userData = await fetchUserDetails(db, data.akey, data.email)
    if (!userData) {
        res.json({ result: false, status: 400, error: 1, msg: "User Not Autherized" })
        return 0
    }

    //Checking product stock
    let stockCheckData = await stockCheck(db, data.orderDetails)
    if (Array.isArray(stockCheckData)) {
        res.json({ status: 400, result: stockCheckData, msg: "Stock exceeded", error: 2 })
        stockCheckData = 1
        return 0
        //have pid, now match pid with the orderedProducts productId and then send back data showing product qunatity exceeds stock quantity
    }

    let orderedDetails = await bindOrderID(userData, data.orderDetails)

    //Updating stock here
    // let stockChangeData
    // if (stockCheckData == 0) {
    //     stockChangeData = await stockChange(db, data.orderDetails)
    // }

    //Clearing cart here
    // let cartData = await cartClear(db, data.email)
    // if (!cartData.deletedCount > 0) {
    //     res.json({ status: 400, msg: "Error in clearing cart" })
    //     return
    // }

    if (userData && stockCheckData != 1) {
        //&& stockChangeData
        setTimeout(() => {
            res.json({ status: 200, userData: userData, message: "Order placed successfully" })
        }, 5000)
    }
})

module.exports = router
