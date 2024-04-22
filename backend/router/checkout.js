const express = require("express")
const router = express.Router()
const uuid = require("uuid")

const { transporter, htmlContext } = require("../lib/emailTemp")

function bindOrderID() {}
function addToUserOrders() {}
function orderMail() {}

function fetchUserDetails(db, akey, email) {
    const userCollection = db.collection("user")
    let userData = userCollection.findOne({ akey: akey, email: email })
    return userData
}

async function changeStockofProduct(db, orderDetails) {
    const proCollection = db.collection("products")

    //First check product is in stock or not
    //Then if product is in stock then update product stock
    //else return back instantly without updating any products
    //console.log(orderDetails)

    let productCheck = await Promise.all(
        orderDetails.itemsOrdered.map(async (item) => {
            let product = await proCollection.findOne(
                {
                    pid: item.productId,
                    stock: { $lt: item.productQty },
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

    //console.log(save)

    // const operations = orderDetails.itemsOrdered.map((product) => ({
    //     updateOne: {
    //         filter: {pdi: productID, stock: {$lt: product.productQty} },
    //         update: { $set: { stock:  } },
    //     },
    // }))

    // let stockData = proCollection.bulkWrite(operations)
    //let stockData = proCollection.updateMany()
    //return stockData

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

    let userData = await fetchUserDetails(db, data.akey, data.email)
    if (!userData) {
        res.json({ result: false, status: 400, error: 1, msg: "User Not Autherized" })
    }

    let stockData = await changeStockofProduct(db, data.orderDetails)
    if (Array.isArray(stockData)) {
        res.json({ status: 400, result: stockData, msg: "Stock exceeded", error: 2 })
        stockData = 1
        //have pid, now match pid with the orderedProducts productId and then send back data showing product qunatity exceeds stock quantity
    }

    // let cartData = await cartClear(db, data.email)
    // if (!cartData.deletedCount > 0) {
    //     res.json({ status: 400, msg: "Error in clearing cart" })
    //     return
    // }

    if (userData && stockData != 1) {
        setTimeout(() => {
            res.json({ status: 200, userData: userData, message: "Order placed successfully" })
        }, 5000)
    }
})

module.exports = router
