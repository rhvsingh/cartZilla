const express = require("express")
const router = express.Router()
const uuid = require("uuid")
const ObjectId = require("mongodb").ObjectId

const { transporter, htmlContext } = require("../lib/emailTemp")

async function authorize(req, res, next) {
    const { email, akey } = req.query
    const db = req.app.locals.db
    const userCollection = db.collection("user")

    let userData = await userCollection.findOne({ email: email, akey: akey })
    if (!(userData == null)) {
        req.userID = userData._id
        next()
    } else {
        res.json({ error: true, status: 401, message: "User unauthorized" })
    }
}

//User Register API

router.post("/register", (req, res) => {
    const db = req.app.locals.db
    const { name, email } = req.body
    let newOTP = Math.floor(Math.random() * 9000) + 1000

    var mailOptions = {
        from: process.env.MyEmail,
        to: email,
        subject: "CartZilla | OTP Verify",
        html: htmlContext(name, newOTP),
    }

    const otpCollections = db.collection("otp")

    otpCollections
        .find({ email: email })
        .limit(1)
        .sort({ _id: -1 })
        .toArray(function (err, result) {
            if (err) {
                console.log(err.message)
            } else if (result.length) {
                otpCollections.updateOne(
                    { email: email },
                    { $set: { otp: newOTP } },
                    function (err, object) {}
                )

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Email sent: " + info.response)
                        res.json({
                            email: email,
                            name: name,
                            register: true,
                            otpStatus: true,
                            msg: "Register successful",
                        })
                    }
                })

                //console.log("OTP updated successfully");
            } else {
                let data = { email: email, name: name, otp: newOTP }
                otpCollections.insertOne(data, function (err, result) {
                    if (err) {
                        res.end("Registration failed")
                        console.warn(err.message)
                    } else {
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error)
                            } else {
                                console.log("Email sent: " + info.response)
                                res.json({
                                    email: email,
                                    name: name,
                                    register: true,
                                    otpStatus: true,
                                    msg: "Register successful",
                                })
                            }
                        })
                    }
                })
            }
        })
})

//User Login API

router.post("/login", (req, res) => {
    const db = req.app.locals.db
    let email = req.body.email
    let newOTP = Math.floor(Math.random() * 9000) + 1000

    const otpCollections = db.collection("otp")

    otpCollections
        .find({ email: email })
        .limit(1)
        .sort({ _id: -1 })
        .toArray(function (err, result) {
            if (err) {
                console.log(err.message)
            } else if (result.length) {
                let name = result[0].name
                let mailOptions = {
                    from: process.env.MyEmail,
                    to: email,
                    subject: "CartZilla | OTP Verify",
                    html: htmlContext(name, newOTP),
                }
                otpCollections.updateOne(
                    { email: email },
                    { $set: { otp: newOTP } },
                    function (err, object) {}
                )
                /* transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Email sent: " + info.response)
                        res.json({
                            email: email,
                            name: name,
                            login: true,
                            otpStatus: true,
                            msg: "Login successful",
                        })
                    }
                }) */

                console.log(newOTP)

                res.json({
                    email: email,
                    name: name,
                    login: true,
                    otpStatus: true,
                    msg: "Login successful",
                })
            } else {
                res.json({
                    msg: "User not found",
                    statusCode: 404,
                    result: false,
                })
            }
        })
})

//OTP verify

router.post("/otpVerify", (req, res) => {
    const db = req.app.locals.db
    let id = uuid.v4()
    let email = req.body.email
    let otp = req.body.otp

    const otpCollections = db.collection("otp")
    const userCollections = db.collection("user")

    otpCollections
        .find({ email: email, otp: otp })
        .limit(1)
        .sort({ _id: -1 })
        .toArray(function (err, result) {
            if (err) {
                console.log("Error occured: " + err.message)
            } else if (result.length) {
                let name = String(result[0]["name"])
                userCollections
                    .find({ email: email })
                    .limit(1)
                    .sort({ _id: -1 })
                    .toArray(function (err, result) {
                        if (err) {
                            console.log("Error: " + err.message)
                        } else if (result.length) {
                            userCollections.updateOne(
                                { email: email },
                                { $set: { akey: id } },
                                function (err, result) {}
                            )
                            res.json({
                                email: email,
                                otpVerify: true,
                                role: result[0].role,
                                msg: "login sucessfull",
                                akey: id,
                            })
                        } else {
                            let data = { email: email, name: name, akey: id, role: ["user"] }
                            userCollections.insertOne(data, function (err, result) {
                                if (err) {
                                    res.end("Registration failed")
                                    console.warn(err.message)
                                }
                            })
                            res.json({
                                email: email,
                                otpVerify: true,
                                role: data.role,
                                msg: "login sucessfull",
                                akey: id,
                            })
                        }
                    })
            } else {
                res.json({
                    email: email,
                    otpVerify: false,
                    msg: "login failed",
                })
            }
        })
})

//Check user is authorized or not

router.post("/userLogged", (req, res) => {
    const db = req.app.locals.db
    let email = req.body.email
    let akey = req.body.akey

    const userCollection = db.collection("user")
    userCollection
        .find({ email: email, akey: akey })
        .limit(1)
        .toArray((err, result) => {
            if (err) {
                console.log(err)
                res.json({ err: err })
            } else if (result.length) {
                res.json({ result: true, statusCode: 200, role: result[0].role })
            } else {
                res.json({ result: false, statusCode: 404 })
            }
        })
})

//Get user info but by authorized user only

router.get("/user/:akey", (req, res) => {
    const db = req.app.locals.db
    let akey = req.params.akey
    const userCollection = db.collection("user")
    userCollection
        .find({ akey: akey })
        .limit(1)
        .sort({ _id: -1 })
        .toArray((err, result) => {
            if (err) {
                console.log(err)
            } else if (result.length) {
                let data = {
                    name: result[0].name,
                    email: result[0].email,
                    mobNum: result[0].mobNum ? result[0].mobNum : "",
                    gender: result[0].gender ? result[0].gender : "",
                    addresses: result[0].addresses ? result[0].addresses.reverse() : "",
                }
                res.json({ result: true, statusCode: 200, data: data })
            } else {
                res.json({
                    result: false,
                    msg: "You are not authorized",
                    data: [],
                })
            }
        })
})

/* Update User Details */

router.post("/user/update", (req, res) => {
    const db = req.app.locals.db
    let data = req.body

    const userCollection = db.collection("user")

    userCollection
        .find({ akey: data.akey })
        .limit(1)
        .toArray((err, result) => {
            if (err) {
                console.log(err)
            } else if (result.length) {
                let dataToUpdate
                if (data.name && data.gender) {
                    dataToUpdate = {
                        name: data.name,
                        gender: data.gender,
                    }
                } else if (data.name) {
                    dataToUpdate = {
                        name: data.name,
                    }
                } else if (data.mobNum) {
                    dataToUpdate = {
                        mobNum: data.mobNum,
                    }
                }
                userCollection.updateOne(
                    { akey: data.akey },
                    { $set: dataToUpdate },
                    (err2, result2) => {
                        if (err2) {
                            console.log(err.message)
                        } else {
                            res.json({ result: true, msg: "User Updated" })
                        }
                    }
                )
            } else {
                res.json({
                    result: false,
                    msg: "You are not authorized",
                    data: [],
                })
            }
        })
})

/* User Address Add */

router.post("/user/address", (req, res) => {
    const db = req.app.locals.db
    let data = req.body
    let uid = uuid.v4()
    let formData = {
        name: data.name,
        mobNum: data.mobNum,
        pinCode: data.pinCode,
        locality: data.locality,
        address: data.address,
        city: data.city,
        state: data.state,
        addressType: data.addressType,
        address_id: uid,
    }

    const userCollection = db.collection("user")

    userCollection
        .find({ akey: data.akey, email: data.email })
        .limit(1)
        .toArray((err, result) => {
            if (err) {
                console.log(err)
            } else if (result.length) {
                if (result[0].addresses) {
                    //console.log("exits ")
                    userCollection.updateOne(
                        { akey: data.akey, email: data.email },
                        {
                            $set: {
                                addresses: [...result[0].addresses, formData],
                            },
                        },
                        (err3, result3) => {
                            if (err3) {
                                console.log(err3.message)
                            } else {
                                res.json({
                                    result: true,
                                    msg: "Added Another Address",
                                    address_id: uid,
                                })
                            }
                        }
                    )
                } else {
                    //console.log("not exits")
                    userCollection.updateOne(
                        { akey: data.akey, email: data.email },
                        { $set: { addresses: [formData] } },
                        (err3, result3) => {
                            if (err3) {
                                console.log(err3.message)
                            } else {
                                res.json({ result: true, msg: "Address Added" })
                            }
                        }
                    )
                }
            } else {
                res.json({ result: false, msg: "User Not Autherized" })
            }
        })
})

/* User Address Update */

router.post("/user/address/update", async (req, res) => {
    const db = req.app.locals.db
    let postData = req.body

    const userCollection = db.collection("user")

    let dataFound = await userCollection.findOne({
        akey: postData.akey,
        email: postData.email,
    })

    if (dataFound !== null && dataFound !== undefined) {
        let newArray = dataFound.addresses.map((addressId) => {
            return addressId.address_id === postData.address_id
                ? {
                      ...addressId,
                      name: postData.name,
                      mobNum: postData.mobNum,
                      pinCode: postData.pinCode,
                      locality: postData.locality,
                      address: postData.address,
                      city: postData.city,
                      state: postData.state,
                      addressType: postData.addressType,
                  }
                : addressId
        })
        userCollection.updateOne(
            { akey: postData.akey, email: postData.email },
            { $set: { addresses: newArray } },
            (err3, result3) => {
                if (err3) {
                    console.log(err3.message)
                } else {
                    res.json({ result: true, msg: "Address Updated" })
                }
            }
        )
    } else {
        res.json({ result: false, msg: "User Not Autherized" })
    }
})

/* User Address Delete */

router.post("/user/address/delete", (req, res) => {
    const db = req.app.locals.db
    let akey = req.body.akey
    let email = req.body.email
    let address_id = req.body.address_id

    const userCollection = db.collection("user")

    userCollection
        .find({ akey: akey, email: email })
        .limit(1)
        .toArray((err, result) => {
            if (err) {
                console.log(err)
            } else if (result.length) {
                let newArray = result[0].addresses.filter((item) => item.address_id !== address_id)

                userCollection.updateOne(
                    { akey: akey, email: email },
                    { $set: { addresses: newArray } },
                    (err3, result3) => {
                        if (err3) {
                            console.log(err3.message)
                        } else {
                            res.json({ result: true, msg: "Addresses Deleted" })
                        }
                    }
                )
            } else {
                res.json({ result: false, msg: "You are not authorized" })
            }
        })
})

// User Order Details Show

router.get("/user/orders/show", authorize, (req, res) => {
    const db = req.app.locals.db
    const ordersCollection = db.collection("orders")

    let customer_id = ObjectId(req.userID).toString()

    ordersCollection
        .find({ customer_id: customer_id })
        .sort({ _id: -1 })
        .toArray((err, result) => {
            if (err) {
                console.log(err)
            } else if (result.length) {
                res.json({ result: true, status: 200, data: result, msg: "Orders" })
            } else {
                res.json({ result: false, msg: "No orders", data: [], error: 0 })
            }
        })
})

module.exports = router
