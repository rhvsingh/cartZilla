const express = require("express")
const router = express.Router()
const uuid = require("uuid")
const ObjectId = require("mongodb").ObjectId

router.post("/catAdd", async (req, res) => {
    const { email, akey, catName, catKeyword, catDesc } = req.body
    const db = req.app.locals.db

    const userCollection = db.collection("user")
    const catCollection = db.collection("category")

    let userData = await userCollection.findOne({ email: email, akey: akey })

    if (!(userData == null)) {
        if (userData.role.includes("admin")) {
            try {
                catCollection.insertOne({
                    catName: catName,
                    catKeyword: catKeyword,
                    catDesc: catDesc,
                })

                res.json({ result: true, status: 200, message: "Added successfully" })
            } catch (e) {
                res.json({
                    error: true,
                    status: 405,
                    message: "Error Occured while inserting category",
                })
            }
        } else {
            //User not authorized
            res.json({ error: true, status: 401, message: "User unauthorized" })
        }
    } else {
        res.json({ error: true, status: 404, message: "User not found" })
    }
})

router.get("/category/:email/:akey", async (req, res) => {
    const { email, akey } = req.params
    const db = req.app.locals.db

    const userCollection = db.collection("user")
    const catCollection = db.collection("category")

    let userData = await userCollection.findOne({ email: email, akey: akey })

    if (!(userData == null)) {
        if (userData.role.includes("admin")) {
            try {
                catCollection
                    .find({})
                    .sort({ _id: -1 })
                    .toArray((err, result) => {
                        if (err) {
                            //Error Occurred
                        } else if (result.length) {
                            res.json(result)
                        } else {
                            //No Recound found
                            res.json({ result: false, message: "No records found" })
                        }
                    })
            } catch (e) {
                res.json({
                    error: true,
                    status: 405,
                    message: "Error Occured while finding category",
                })
            }
        } else {
            //User not authorized
            res.json({ error: true, status: 401, message: "User unauthorized" })
        }
    } else {
        res.json({ error: true, status: 404, message: "User not found" })
    }
})

router.use("/catDel", async (req, res, next) => {
    const { email, akey } = req.query
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
})

router.delete("/catDel", async (req, res, next) => {
    const { catId } = req.query
    const db = req.app.locals.db

    const catCollection = db.collection("category")

    let catData = await catCollection.deleteOne({ _id: ObjectId(catId) })

    if (catData.deletedCount > 0) {
        res.json({ message: "Deleted Successfully", status: 200 })
    } else {
        res.json({ message: "Not deleted", status: 403 })
    }
})

router.use("/catEdit", async (req, res, next) => {
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
})

router.put("/catEdit", async (req, res, next) => {
    const { catId, catName, catKeyword, catDesc } = req.body
    const db = req.app.locals.db

    const catCollection = db.collection("category")

    let catData = await catCollection.updateOne(
        { _id: ObjectId(catId) },
        { $set: { catName: catName, catKeyword: catKeyword, catDesc: catDesc } }
    )

    if (catData.modifiedCount > 0) {
        res.json({ message: "Edited Successfully", status: 200 })
    } else {
        res.json({ message: "Error occured", status: 403 })
    }
})

module.exports = router
