const express = require('express')
const routing = express.Router()
const posts = require ("./post")

routing.use("/user",posts)


module.exports = routing