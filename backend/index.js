require("dotenv").config()

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const port = process.env.PORT_NUMBER

//modules
const UserAPI = require("./router/user")
const CategoryAPI = require("./router/category")
const ProductAPI = require("./router/product")
const CartAPI = require("./router/cart")
const CheckoutAPI = require("./router/checkout")
const AdminPanel = require("./router/admin/index")

const allowlist = [
    "http://localhost:3000",
    "https://cart-zilla-rhvsingh.vercel.app",
    "https://cart-zilla-dun.vercel.app",
    "https://cart-zilla-git-main-rhvsingh.vercel.app",
]
const corsOptionsDelegate = function (req, callback) {
    let corsOptions
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptionsDelegate))

//Accessing Image Files
app.use("/uploads", express.static("uploads"))

//var http = require('http');

//http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
//resp.on('data', function(ip) {
//console.log("My public IP address is: " + ip);
//});
//});

//MongoDb Connection
const MongoClient = require("mongodb").MongoClient
const dbUrl = process.env.DB_URL
const dbName = "ecommerce"

const client = new MongoClient(dbUrl)

const connectDB = async () => {
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

//User

app.use(UserAPI)

//Category

app.use(CategoryAPI)

//Product

app.use(ProductAPI)

//Cart

app.use(CartAPI)

//Checkout

app.use(CheckoutAPI)

//Admin Panel

app.use("/admin", AdminPanel)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Ecommerce app listening at http://localhost:${port}`)
    })
})
