const route = require('express').Router()
const { createRole, getRoles } = require('../controllers/role.controllers')

route.get('/getRole', getRoles)
route.post('/createRoles', createRole)


module.exports = route