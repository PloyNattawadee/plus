const Ordetail = require('../model/db').OrderDetail
const routeOrder = require('express').Router()

routeOrder.post('/addtocart', (req, res) => {
    
    Ordetail.create({

    })
})