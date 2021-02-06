const express = require('express')
const routing = express.Router()
const posts = require ("./post")

routing.use("/Users",posts)


module.exports = routing