const express = require('express')
const routes = express.Router()

const admin = require ('./admin/index')
const users = require ('./users/index')
const global = require ('./global/index')

routes.use('/', users ) //TODO : paramétrage userID.
routes.use('/admin', admin )
routes.use('/global', global )


module.exports = routes