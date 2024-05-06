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

const { transporter } = require("../lib/emailTemp")

function imageShow(orderDetails) {
    let htmlContext = ""
    orderDetails.products.map(
        (product) =>
            (htmlContext += `<tr>
            <td>
                <div class="productImage">
                <img
                    src="uploads/${product.img}"
                    alt="Product Image"
                />
                </div>
                <div data-alias="product-name">${product.name}</div>
            </td>
            <td>Rs. ${product.productPrice.toLocaleString("en-IN")}</td>
            <td>${product.productQty}</td>
            <td>Rs. ${product.productTotalPrice.toLocaleString("en-IN")}</td>
        </tr>`)
    )

    return htmlContext
}

function htmlTemplate(orderDetails) {
    let buyDate = new Date(orderDetails.order_date + " " + orderDetails.order_time)

    let year = buyDate.getFullYear()
    let month = buyDate.toLocaleString("default", { month: "long" })
    let date = ("0" + buyDate.getDate()).slice(-2)
    let time = buyDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    })

    let htmlContext = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Details | CartZilla</title>
        <style>
        .orderID {
        font-size: 0.95rem;
        margin-bottom: 0.15rem;
    }
    .orderID span {
        font-weight: 500;
    }
    
    .time {
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--black-color-3);
    }
    
    .orderTable {
        width: 100%;
        text-align: left;
        border-collapse: collapse;
    }
    
    .orderTable th[data-alias="product"] {
        width: 60%;
    }
    
    .orderTable th[data-alias="price"] {
        width: 15%;
    }
    
    .orderTable th[data-alias="qty"] {
        width: auto;
    }
    
    .orderTable th[data-alias="total"] {
        width: auto;
    }
    
    .orderTable,
    .orderTable th,
    .orderTable td {
        border: 1px solid var(--white-color-c);
        border-collapse: collapse;
        text-align: left;
    }
    
    .orderTable th,
    .orderTable td {
        padding: 0.8rem 0.5rem;
    }
    
    .orderTable td {
        font-size: clamp(0.75rem, 2vw, 0.95rem);
        color: var(--black-color-5);
    }
    
    .orderTable td [data-alias="product-name"] {
        font-weight: 600;
        color: var(--black-color-3);
    }
    
    .total td {
        color: var(--black-color-0);
        font-weight: 600;
    }
    
    .productImage {
        max-width: 150px;
        border-radius: 6px;
        overflow: hidden;
    }
    
    @media screen and (max-width: 500px) {
        .orderTable th,
        .orderTable td {
            padding: 0.4rem 0.25rem;
        }
    }
    
    .fw_6 {
        font-weight: 600;
    }
    
    .status {
        text-transform: capitalize;
        font-size: 0.85rem;
        font-weight: 500;
        margin-bottom: 0.75rem;
    }
    
    .address {
        font-size: 0.85rem;
        line-height: 1.35;
    }
    
    .billing-address {
        display:flex;
        gap: 2rem;
        flex-wrap: wrap;
        margin-block: 1rem;
    }
        </style>
    </head>
    
    <body>
        <div style="padding: 0.25rem 0.50rem">
            <div style="margin-block: 0.50rem 1rem">
                <div class="orderID">
                    Order ID: <span>${orderDetails.order_id}</span>
                </div>
                <div class="time">Placed on ${month} ${date}, ${year} ${time}</div>
            </div>
            <div>
                <table class="orderTable">
                    <thead>
                        <tr>
                            <th data-alias="product">Product</th>
                            <th data-alias="price">Price</th>
                            <th data-alias="qty">Quantity</th>
                            <th data-alias="total">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${imageShow(orderDetails)}
                        <tr>
                            <td colSpan="3">Subtotal</td>
                            <td>Rs. ${parseFloat(orderDetails.subtotal).toLocaleString(
                                "en-IN"
                            )}</td>
                        </tr>
                        <tr>
                            <td colSpan="3">Shipping (Standard)</td>
                            <td>
                                Rs. ${parseFloat(orderDetails.shipping_cost).toLocaleString(
                                    "en-IN"
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">Tax (IGST 18.0%)</td>
                            <td>
                                Rs. ${parseFloat(orderDetails.tax_amount).toLocaleString("en-IN")}
                            </td>
                        </tr>
                        <tr class="total">
                            <td colSpan="3">Total</td>
                            <td>
                                Rs. ${parseFloat(orderDetails.subtotal).toLocaleString("en-IN")} INR
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="billing-address">
                <div>
                    <div class="fw_6" style="margin-bottom: 0.25rem;">Billing Address</div>
                    <div class="status">
                        Payment Method <!---Status--->: <span style="text-transform:uppercase">${
                            orderDetails.payment_method
                        }</span>
                    </div>
                    <div class="address">
                        ${orderDetails.address_shipped.address} <br />
                        ${orderDetails.address_shipped.city} ${orderDetails.address_shipped.pinCode}
                        <br />
                        ${orderDetails.address_shipped.state} <br />
                        +91${orderDetails.address_shipped.mobNum} <br />
                    </div>
                </div>
                <div>
                    <div class="fw_6" style="margin-bottom: 0.25rem;">Shipping Address</div>
                    <div class="status">
                        Fulfillment Status: ${orderDetails.status}
                    </div>
                    <div class="address">
                        ${orderDetails.address_shipped.address} <br />
                        ${orderDetails.address_shipped.city} ${orderDetails.address_shipped.pinCode}
                        <br />
                        ${orderDetails.address_shipped.state} <br />
                    </div>
                </div>
            </div>
        </div>
    </body>
    
    </html>`

    return htmlContext
}

function orderMail(email, orderDetails, productDetailsForMail) {
    orderDetails.products = productDetailsForMail
    let mailOptions = {
        from: process.env.MyEmail,
        to: email,
        subject: "Order Details | CartZilla",
        html: htmlTemplate(orderDetails),
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            //console.log("Email sent: " + info.response)
            return 0
        }
    })
}

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
    let itemArray2 = []

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

                let data2 = {
                    productId: product.pid,
                    productQty: pro.productQty,
                    productPrice: product.price,
                    productDiscount: product.discount,
                    productDiscountedPrice: discountedPrice,
                    productTotalPrice: productTotalPrice,
                    name: product.name,
                    img: product.img[0],
                }
                itemArray.push(data)
                itemArray2.push(data2)
                return true
            }
        })
    })
    return [tprice.toFixed(2), qty, itemArray, itemArray2]
}

function bindOrderID(userDetails, orderDetails, productDetails) {
    let uniqueCharacter = `order_${generateLimitedUniqueCharacter(
        5
    )}-${generateLimitedUniqueCharacter(10)}`

    let uniqueOrderId = `order_${generateLimitedUniqueCharacter(
        5
    )}-${generateLimitedUniqueCharacter(10)}`

    let customer_id = ObjectId(userDetails._id).toString()
    let [totalPrice, totalQty, products, productDetailsForMail] = sliceProductDetails(
        orderDetails.itemsOrdered,
        productDetails
    )

    const d = new Date()

    let year = d.getFullYear()
    let month = ("0" + (d.getMonth() + 1)).slice(-2)
    let date = ("0" + d.getDate()).slice(-2)
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()

    let orders = {
        order_id: uniqueCharacter,
        customer_id: customer_id,
        order_date: year + "-" + month + "-" + date,
        order_time: hours + ":" + minutes + ":" + seconds,
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

    return [orders, orderedDetails, productDetailsForMail]
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
                    {
                        projection: {
                            pid: 1,
                            name: 1,
                            price: 1,
                            discount: 1,
                            img: 1,
                            stock: 1,
                            _id: 0,
                        },
                    }
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

    let [orders, orderedDetails, productDetailsForMail] = bindOrderID(
        userData,
        data.orderDetails,
        productDetails
    )

    let insertedOrders = setOrderCollection(db, orders)
    if (!insertedOrders) {
        res.json({ status: 400, msg: "Orders Collection Error", error: 2 })
        return 0
    }

    let insertedOrderCollection = setOrderDetailsCollection(db, orderedDetails)
    if (!insertedOrderCollection) {
        res.json({ status: 400, msg: "Order_Details Collection Error", error: 2 })
        return 0
    }

    //Updating stock here
    let stockChangeData
    if (stockCheckData == 0) {
        stockChangeData = await stockChange(db, data.orderDetails)
    }

    //Clearing cart here
    let cartData = await cartClear(db, data.email)
    if (!cartData.deletedCount > 0) {
        res.json({ status: 400, msg: "Error in clearing cart" })
        return
    }

    orderMail(userData.email, orderedDetails, productDetailsForMail)

    if (userData && stockCheckData != 1) {
        //&& stockChangeData
        setTimeout(() => {
            res.json({ status: 200, userData: userData, message: "Order placed successfully" })
        }, 2000)
    } else {
        res.json({ status: 501, userData: [], message: "Order not placed" })
    }
})

module.exports = router
