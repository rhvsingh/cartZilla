const express = require("express")
const router = express.Router()
const uuid = require("uuid")

const AdminUser = require("./user/adminUser")
const Category = require("./category/category")

//Admin User
router.use(AdminUser)

//Category API
router.use(Category)

module.exports = router
