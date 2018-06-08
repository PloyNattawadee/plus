const route = require('express').Router()

route.use('/account', require('../api/controller/register'))
route.use('/category', require('../api/controller/category'))
route.use('/product', require('../api/controller/product'))
route.use('/image', require('../api/controller/productimage'))
route.use('/admin', require('../api/controller/admin'))
module.exports = {
    route
}
