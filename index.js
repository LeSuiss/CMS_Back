require('dotenv').config()
const express = require("express");
const app= express()
const cors = require("cors")
const models = require("./models");

const port = process.env.PORT || 3002

const routes = require('./routes/index')

app.use(cors())
app.use (express.json())
app.use(express.urlencoded(
{extended:true}
))



app.use("/", routes)


models 
    .sequelize 
    .sync({forced: true}) 
    .then(() =>app.listen(port, () =>console.log(`Server is running on ${port}`)))
    ;


