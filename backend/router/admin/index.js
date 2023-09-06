const express = require("express")
const router = express.Router()
const uuid = require("uuid")

const AdminUser = require("./user/adminUser")

//Admin User
router.use(AdminUser)

module.exports = router
