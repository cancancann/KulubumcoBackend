const express = require('express')
const app = express();
const routers = require("./Routes/index")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const { customErrorHandler } = require('./middleware/errors/customErrorHandler');
var cors = require('cors')
const fileUpload = require("express-fileupload")


app.use(cors({ origin: true, credentials: true })) // Use this after the variable declaration
app.use(cookieParser())




app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

dotenv.config({
    path: "./config/config.env"
})
app.use(fileUpload())

app.use("/api", routers)
app.use(customErrorHandler)

app.use("", (req, res, next) => {
    // res.redirect('/api')
})
app.listen(4000, () => {
    console.log('listining port 4000')
})


