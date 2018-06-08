const ProductImage = require('../model/db').ProductImage
const routeImg = require('express').Router();
const sequelize = require('../model/db');

routeImg.post('/insert/img', (req, res) => {
    let dataimage = req.body.productimgname ;
    let buff = new Buffer(dataimage,'base64');
    console.log("Image : "+buff)
    let genidimg = '1';
    ProductImage.count('productimgid').then((max) => {
        genidimg = "MG-" + (max + 1);
    }).then((image) => {
        const imgData = {
            productimgid: genidimg,
            productimgname: buff
        }
        ProductImage.create(imgData, (res, result) => {
        }).then((category) => {
            console.log(category)
            res.status(201).json({
                status: '1'
            }).catch((err) => {
                console.log(err)
                res.status(500).json({
                    status: '0'
                })
            })
        }).catch((err) => {
            res.send({
                status: "Failed"
            })
        })
    })
});
module.exports = routeImg