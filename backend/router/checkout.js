const express = require("express")
const router = express.Router()
const crypto = require("crypto")
const validator = require("validator")
const ObjectId = require("mongodb").ObjectId

function generateLimitedUniqueCharacter(length) {
    let randomBytes = crypto.randomBytes(length)
    let uniqueCharacter = randomBytes.toString("hex").substring(0, length)
    return uniqueCharacter
}

const { transporter, htmlContext } = require("../lib/emailTemp")
const { stat } = require("fs")

function orderMail() {}

function fetchUserDetails(db, akey, email) {
    const userCollection = db.collection("user")
    let userData = userCollection.findOne({ akey: akey, email: email })
    return userData
}

function fetchAddress(userDetails, addressID) {
    let address = userDetails.addresses.filter((address) => address.address_id == addressID)
    return address[0]
}

function sliceProductDetails(products, productDetails) {
    let tprice = 0
    let qty = 0
    let itemArray = []

    productDetails.map((product) => {
        products.some((pro) => {
            if (pro.productId === product.pid) {
                let productPrice = parseFloat(product.price)
                let discountedPrice =
                    productPrice - (productPrice / 100) * parseInt(product.discount)
                let productTotalPrice = discountedPrice * pro.productQty
                qty += pro.productQty
                tprice += productTotalPrice
                let data = {
                    productId: product.pid,
                    productQty: pro.productQty,
                    productPrice: product.price,
                    productDiscount: product.discount,
                    productDiscountedPrice: discountedPrice,
                    productTotalPrice: productTotalPrice,
                }
                itemArray.push(data)
                return true
            }
        })
    })
    return [tprice.toFixed(2), qty, itemArray]
}

function bindOrderID(userDetails, orderDetails, productDetails) {
    let uniqueCharacter = `order_${generateLimitedUniqueCharacter(
        5
    )}-${generateLimitedUniqueCharacter(10)}`

    let uniqueOrderId = `order_${generateLimitedUniqueCharacter(
        5
    )}-${generateLimitedUniqueCharacter(10)}`

    let customer_id = ObjectId(userDetails._id).toString()
    let [totalPrice, totalQty, products] = sliceProductDetails(
        orderDetails.itemsOrdered,
        productDetails
    )

    const d = new Date()

    console.log(d)

    console.log(d.getDate(), d.getMonth())

    let orders = {
        order_id: uniqueCharacter,
        customer_id: customer_id,
        order_date: d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear(),
        order_time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        total_amount: totalPrice,
        status: "pending",
    }

    let addressDetails = fetchAddress(userDetails, orderDetails.shippingAddressID)

    let orderedDetails = {
        order_detail_id: uniqueOrderId,
        order_id: uniqueCharacter,
        order_date: orders.order_date,
        order_time: orders.order_time,
        quantity: totalQty,
        discountedPrice: totalPrice,
        products: products,
        tax_rate: "0",
        shipping_cost: "0",
        status: "pending", //(  ‘pending’, ‘shipped’, or ‘delivered’ )
        return_flag: "", //(boolean)
        promotion_code: "",
        customization_details: "", // ( text ) ( size, color, or other attributes )
        digital_license_key: "", // ( For digital goods, this field can store the license key or identifier )
        subtotal: totalPrice, //(quantity * (unit_price - discount))
        tax_amount: "0", //(subtotal * (tax_rate / 100))
        total: "", //(subtotal + tax_amount + shipping_cost)
        address_shipped: addressDetails,
        payment_method: validator.escape(orderDetails.paymentMethodSelected),
    }

    return [orders, orderedDetails]
}

//Fetching product details and checking stocks too
async function stockCheck(db, orderDetails) {
    const proCollection = db.collection("products")

    const promises = [
        Promise.all(
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
        ),
        Promise.all(
            orderDetails.itemsOrdered.map(async (item) => {
                let product = await proCollection.findOne(
                    {
                        pid: item.productId,
                    },
                    { projection: { pid: 1, name: 1, price: 1, discount: 1, stock: 1, _id: 0 } }
                )
                return product
            })
        ),
    ]

    let [productCheck, products] = await Promise.all(promises)

    let againCheck = productCheck.filter((el) => {
        if (el !== null) {
            return el
        }
    })

    if (againCheck.length > 0) {
        return [againCheck, 1]
    }

    return [0, products]
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

async function setOrderCollection(db, orders) {
    const orderCollection = db.collection("orders")

    let result = await orderCollection.insertOne(orders)

    if (result.acknowledged) {
        return true
    }
    return false
}

async function setOrderDetailsCollection(db, orderedDetails) {
    const orderedDetailsCollection = db.collection("order_details")
    let result = await orderedDetailsCollection.insertOne(orderedDetails)

    if (result.acknowledged) {
        return true
    }
    return false
}

//Checkout Process
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
    let [stockCheckData, productDetails] = await stockCheck(db, data.orderDetails)
    if (Array.isArray(stockCheckData)) {
        res.json({ status: 400, result: stockCheckData, msg: "Stock exceeded", error: 2 })
        stockCheckData = 1
        return 0
        //have pid, now match pid with the orderedProducts productId and then send back data showing product qunatity exceeds stock quantity
    }

    let [orders, orderedDetails] = bindOrderID(userData, data.orderDetails, productDetails)

    // let insertedOrders = setOrderCollection(db, orders)
    // if (!insertedOrders) {
    //     res.json({ status: 400, msg: "Orders Collection Error", error: 2 })
    //     return 0
    // }

    // let insertedOrderCollection = setOrderDetailsCollection(db, orderedDetails)
    // if (!insertedOrderCollection) {
    //     res.json({ status: 400, msg: "Order_Details Collection Error", error: 2 })
    //     return 0
    // }

    // //Updating stock here
    // let stockChangeData
    // if (stockCheckData == 0) {
    //     stockChangeData = await stockChange(db, data.orderDetails)
    // }

    // //Clearing cart here
    // let cartData = await cartClear(db, data.email)
    // if (!cartData.deletedCount > 0) {
    //     res.json({ status: 400, msg: "Error in clearing cart" })
    //     return
    // }

    // if (userData && stockCheckData != 1) {
    //     //&& stockChangeData
    //     setTimeout(() => {
    //         res.json({ status: 200, userData: userData, message: "Order placed successfully" })
    //     }, 2000)
    // }
})

module.exports = router
