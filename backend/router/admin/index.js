const express = require("express")
const router = express.Router()
const uuid = require("uuid")

const AdminUser = require("./user/adminUser")
const Category = require("./category/category")
const Product = require("./product/product")

//Admin User
router.use(AdminUser)

//Category API
router.use(Category)

//Product API
router.use(Product)

module.exports = router
