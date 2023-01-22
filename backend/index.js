require("dotenv").config()

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const router = express.Router()
const uuid = require("uuid")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const nodemailer = require("nodemailer")
const port = process.env.PORT_NUMBER

app.use(bodyParser.json())
app.use(cors())

app.use("/uploads", express.static("uploads"))

//MongoDb Connection
const MongoClient = require("mongodb").MongoClient
const dbUrl = process.env.DB_URL
const dbName = "ecommerce"

const client = new MongoClient(dbUrl)

async function run() {
  try {
    await client.connect()
    console.log("MongoDB Connected successfully to server")
    const db = client.db(dbName)
    app.locals.db = db
  } catch (err) {
    console.log(err.stack)
  } finally {
    //await client.close();
  }
}

run()

const myEmail = process.env.MyEmail
const myPassword = process.env.MyPassword

var transporter = nodemailer.createTransport({
  service: "gmaill",
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: myEmail,
    pass: myPassword,
  },
  secure: true,
})

function htmlContext(name, newOTP) {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="#" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">CartZilla</a>
          </div>
          <p style="font-size:1.1em">Hi ${name},</p>
          <p>Thank you for choosing CartZilla. Use the following OTP to complete your Sign Up procedures.</p>
          <p>Your OTP is</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${newOTP}</h2>
          <p style="font-size:0.9em;">Regards,<br />CartZilla</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>CartZilla</p>
            <p>Lucknow</p>
            <p>Uttar Pradesh</p>
          </div>
        </div>
      </div>`
}

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" })
})

//Version Checker API

app.get("/checkVersion/:version", (req, res) => {
  let appVersion = req.params.version
  let currentVersion = 3
  if (appVersion < currentVersion) {
    res.json({ msg: "New version available. Please update!" })
  } else {
    res.json({ msg: "No new version available" })
  }
})

//User Register API

app.post("/register", (req, res) => {
  const db = app.locals.db
  let name = req.body.name
  let email = req.body.email

  let newOTP = Math.floor(Math.random() * 9000) + 1000

  var mailOptions = {
    from: myEmail,
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

app.post("/login", (req, res) => {
  const db = app.locals.db
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
          from: myEmail,
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
        res.json({ msg: "User not found", statusCode: 404, result: false })
      }
    })
})

//OTP verify

app.post("/otpVerify", (req, res) => {
  const db = app.locals.db
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
            } else {
              let data = { email: email, name: name, akey: id }
              userCollections.insertOne(data, function (err, result) {
                if (err) {
                  res.end("Registration failed")
                  console.warn(err.message)
                }
              })
            }
          })

        res.json({
          email: email,
          otpVerify: true,
          msg: "login sucessfull",
          akey: id,
        })
      } else {
        res.json({ email: email, otpVerify: false, msg: "login failed" })
      }
    })
})

//Check user is authorized or not

app.post("/userLogged", (req, res) => {
  const db = app.locals.db
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
        res.json({ result: true, statusCode: 200 })
      } else {
        res.json({ result: false, statusCode: 404 })
      }
    })
})

//Get user info but by authorized user only

app.get("/user/:akey", (req, res) => {
  const db = app.locals.db
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
        res.json({ result: false, msg: "You are not authorized", data: [] })
      }
    })
})

/* Update User Details */

app.post("/user/update", (req, res) => {
  const db = app.locals.db
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
        res.json({ result: false, msg: "You are not authorized", data: [] })
      }
    })
})

/* User Address Add */

app.post("/user/address", (req, res) => {
  const db = app.locals.db
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
            { $set: { addresses: [...result[0].addresses, formData] } },
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

app.post("/user/address/update", async (req, res) => {
  const db = app.locals.db
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

app.post("/user/address/delete", (req, res) => {
  const db = app.locals.db
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
        let newArray = result[0].addresses.filter(
          (item) => item.address_id !== address_id
        )

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

//Product Listing API

app.get("/productList", (req, res) => {
  const db = app.locals.db
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

app.get("/products/:key", (req, res) => {
  const db = app.locals.db
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

//Product Add API

app.post("/addProduct", (req, res) => {
  const db = app.locals.db
  let pid = uuid.v4()
  let img = req.body.img
  let name = req.body.name
  let desc = req.body.desc
  let price = req.body.price
  let discount = req.body.discount

  const productsCollection = db.collection("products")

  let productData = {
    pid: pid,
    img: img,
    name: name,
    desc: desc,
    price: price,
    discount: discount,
  }

  productsCollection.insertOne(productData, function (err, result) {
    if (err) {
      res.end("Failed to insert product: " + err.message)
      console.warn(err.message)
    }
  })

  res.json({ result: true, pid: pid, msg: "Product inserted successfully." })
})

//Cart

app.post("/addCart", (req, res) => {
  const db = app.locals.db
  let pid = req.body.pid
  let qty = req.body.qty
  let cId = uuid.v4()

  const cartCollection = db.collection("cart")
  const productsCollection = db.collection("products")

  if (qty == -1 || qty == 1) {
    productsCollection
      .find({ pid: pid })
      .limit(1)
      .sort({ _id: -1 })
      .toArray((err, result) => {
        if (err) {
          console.log(err.message)
        } else if (result.length) {
          let data = { pid: pid, qty: qty, cId: cId }

          cartCollection
            .find({ pid: pid })
            .limit(1)
            .sort({ _id: -1 })
            .toArray((err2, result2) => {
              if (err2) {
                console.log(err2.message)
              } else if (result2.length) {
                let newQty = result2[0].qty + qty
                if (newQty > 0) {
                  cartCollection.updateOne(
                    { pid: pid },
                    { $set: { qty: newQty } },
                    (err3, result3) => {
                      if (err3) {
                        console.log(err3.message)
                      } else {
                        res.json({ result: true, msg: "Cart Updated" })
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
                  cartCollection.insertOne(data, (err3, result3) => {
                    if (err3) {
                      console.log(err3.message)
                    } else {
                      res.json({ result: true, msg: "Added successfully" })
                    }
                  })
                }
              }
            })
        } else {
          res.json({ result: false, msg: "No product found with this pid" })
        }
      })
  } else {
    res.json({
      result: false,
      msg: "Invalid quantity number. Alteration in Cart not possible",
    })
  }
})

//addCart with userId

app.post("/addCart/:akey", (req, res) => {
  const db = app.locals.db
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
                let price = result[0].price
                let data = { email: email, pid: pid, qty: qty, cId: cId }

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
                        let tprice = price * newQty
                        cartCollection.updateOne(
                          { pid: pid, email: email },
                          { $set: { qty: newQty, tprice: tprice } },
                          (err3, result3) => {
                            if (err3) {
                              console.log(err.message)
                            } else {
                              res.json({ result: true, msg: "Cart Updated" })
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
                        data.tprice = price
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

//Show Complete Cart

app.get("/showCart", (req, res) => {
  const db = app.locals.db
  const joinCollections = db.collection("cart")
  joinCollections
    .aggregate([
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
        res.json({ result: result })
      }
    })
})

//Show user's cart

app.get("/showCart/:akey", (req, res) => {
  let akey = req.params.akey
  const db = app.locals.db

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

//CartCount without user
app.get("/cartCount", async (req, res) => {
  const db = app.locals.db
  const cartCollection = db.collection("cart")
  let data = await cartCollection.estimatedDocumentCount()
  var cartTotalQty = 0
  cartCollection.find({}).toArray((err, result) => {
    if (err) {
      console.log(err.message)
    } else if (result.length) {
      for (let i = 0; i < result.length; i++) {
        cartTotalQty = cartTotalQty + parseInt(result[i].qty)
      }
      res.json({ result: true, count: data, totalQty: cartTotalQty })
    } else {
      res.json({ result: false, count: null, totalQty: null })
    }
  })
})

//CartCount of user
app.get("/cartCount/:akey", (req, res) => {
  const db = app.locals.db
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
              cartTotalQty = cartTotalQty + parseInt(result2[i].qty)
              cartTotalCalcPrice =
                cartTotalCalcPrice + parseInt(result2[i].tprice)
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
app.get("/cartDelete/:pid/:akey", (req, res) => {
  const db = app.locals.db
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
        cartCollection.deleteOne(
          { pid: pid, email: email },
          (err2, result2) => {
            if (err2) {
              console.log(err2)
              res.json({ result: false, msg: "Deletion Failed" })
            } else {
              res.json({ result: true, msg: "Deletion Successful" })
            }
          }
        )
      } else {
        res.json({ result: false, msg: "User not found" })
      }
    })
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    console.log(file)
    let imgId = Math.floor(Math.random() * 90000) + 10000
    let fileName = file.originalname.toLowerCase().split(" ").join("-")
    fileName = imgId + "-" + fileName
    cb(null, fileName)
  },
})

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/
    var mimetype = filetypes.test(file.mimetype)

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    if (mimetype && extname) {
      return cb(null, true)
    }

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    )
  },
})

app.post(
  "/product/img/test",
  upload.single("productImage"),
  (req, res, next) => {
    if (!req.file) {
      res.send({ code: 500, msg: "err" })
    } else {
      //console.log(req.file)
      res.send({
        code: 200,
        imgName: req.file.filename,
        msg: "Upload successful",
      })
    }
  }
)

app.listen(port, () => {
  console.log(`Ecommerce app listening at http://localhost:${port}`)
})

//Export the Express API
module.exports = app
