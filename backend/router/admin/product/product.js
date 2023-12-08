const express = require("express")
const router = express.Router()
const path = require("path")
const multer = require("multer")
const uuid = require("uuid")
const fs = require("fs")

async function authorize(req, res, next) {
    const { email, akey } = req.body
    const db = req.app.locals.db

    const userCollection = db.collection("user")

    let userData = await userCollection.findOne({ email: email, akey: akey })

    if (!(userData == null)) {
        if (userData.role.includes("admin")) {
            next()
        } else {
            //User not authorized
            res.json({ error: true, status: 401, message: "User unauthorized" })
        }
    } else {
        res.json({ error: true, status: 404, message: "User not found" })
    }
}

//Product Add API

router.post("/addProduct", authorize, (req, res) => {
    const db = req.app.locals.db
    let pid = uuid.v4()
    let img = req.body.img
    let name = req.body.name
    let desc = req.body.desc
    let price = req.body.price
    let discount = req.body.discount
    let stock = req.body.stock
    let category = req.body.category

    const productsCollection = db.collection("products")

    let productData = {
        pid: pid,
        img: img,
        name: name,
        desc: desc,
        price: price,
        discount: discount,
        stock: stock,
        category: category,
    }

    productsCollection.insertOne(productData, function (err, result) {
        if (err) {
            res.end("Failed to insert product: " + err.message)
            console.warn(err.message)
        }
    })

    res.json({ result: true, status: 200, pid: pid, msg: "Product inserted successfully." })
})

async function authorizeUser(req, res, next) {
    const { email, akey } = req.body
    const db = req.app.locals.db

    const userCollection = db.collection("user")

    let userData = await userCollection.findOne({ email: email, akey: akey })

    if (!(userData == null)) {
        if (userData.role.includes("admin")) {
            next()
        } else {
            //User not authorized
            req.files.map((item) =>
                fs.unlink(item.path, (err) => {
                    if (err) console.log(err)
                })
            )
            res.json({ error: true, status: 401, message: "User unauthorized" })
        }
    } else {
        req.files.map((item) =>
            fs.unlink(item.path, (err) => {
                if (err) console.log(err)
            })
        )
        res.json({ error: true, status: 404, message: "User not found" })
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
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
        //console.log(file)
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png|webp/
        var mimetype = filetypes.test(file.mimetype)

        var extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        if (mimetype && extname) {
            return cb(null, true)
        }

        cb("Error: File upload only supports the " + "following filetypes - " + filetypes)
    },
})

router.post("/product/img", upload.array("productImage", 5), authorizeUser, (req, res) => {
    if (!req.files) {
        res.send({ code: 500, msg: "err" })
    } else {
        //console.log(req.file)

        let newArray = req.files.map((item) => item.filename)
        res.send({
            code: 200,
            imgName: newArray,
            msg: "Upload successful",
        })
    }
})

module.exports = router
