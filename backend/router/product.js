const express = require("express")
const router = express.Router()
const path = require("path")
const multer = require("multer")
const uuid = require("uuid")

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

//Product Add API

router.post("/addProduct", (req, res) => {
  const db = req.app.locals.db
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

router.post(
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

module.exports = router
