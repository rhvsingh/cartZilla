const express = require("express")
const router = express.Router()

router.get("/categoryList", async (req, res) => {
    const db = req.app.locals.db
    const catCollection = db.collection("category")

    try {
        catCollection
            .find({})
            .sort({ _id: -1 })
            .toArray((err, result) => {
                if (err) {
                    //Error Occurred
                } else if (result.length) {
                    let catNamesOnly = result.map((item) => item.catName)
                    res.json(catNamesOnly)
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
})

router.get("/category/:name", async (req, res) => {
    const db = req.app.locals.db
    const catName = req.params.name
    const catCollection = db.collection("category")
    try {
        let result = await catCollection.findOne({ catName: catName })
        if (result) {
            res.json({ result: result, status: 200 })
        } else {
            //No Recound found
            res.json({ result: false, message: "No records found" })
        }
    } catch (e) {
        res.json({
            error: true,
            status: 405,
            message: "Error Occured while finding category",
        })
    }
})

module.exports = router
