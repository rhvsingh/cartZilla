const express = require("express")
const router = express.Router()
const uuid = require("uuid")

const { transporter, htmlContext } = require("../../../lib/emailTemp")

//User Login API

router.post("/adminLogin", (req, res) => {
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
                transporter.sendMail(mailOptions, function (error, info) {
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
                            if (!result[0].role.includes("admin")) {
                                res.json({
                                    email: email,
                                    otpVerify: false,
                                    role: false,
                                    msg: "login failed",
                                })
                            } else {
                                userCollections.updateOne(
                                    { email: email },
                                    { $set: { akey: id } },
                                    function (err, result) {}
                                )
                            }
                        } /* else {
                            let data = { email: email, name: name, akey: id }
                            userCollections.insertOne(data, function (err, result) {
                                if (err) {
                                    res.end("Registration failed")
                                    console.warn(err.message)
                                }
                            })
                        } */
                    })

                res.json({
                    email: email,
                    otpVerify: true,
                    msg: "login sucessfull",
                    role: true,
                    akey: id,
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
                if (result[0].role.includes("admin")) {
                    res.json({ result: true, statusCode: 200 })
                } else {
                    res.json({ result: false, statusCode: 405 })
                }
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
                    role: result[0].role ? result[0].role : "",
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

module.exports = router
