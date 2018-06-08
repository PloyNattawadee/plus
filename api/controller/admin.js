const loginAdmin = require('../model/db').loginAdmin
const routeAdmin = require('express').Router()

routeAdmin.post('/login', (req, res) => {
    var username = req.body.username
    var password = req.body.password
    loginAdmin.findOne({
        where: {
            adminusername: username
        }
    /*}).then((admin) => {
        res.json({
            status: '1'
        })
    }).catch((err) => {
        res.json({
            status: '0'
        })*/
    })
    createCookies(req, res, (result) => {
        console.log("1111:" + result)
        //return res.cookie('cookieName', result, { maxAge: 1000 * 60 * 15, httpOnly: false })
        //res.send(req.cookie.result)
        //res.send(req.cookie.result)
        return res.json({
            status: '1',
            cookie: result
        })
    })

    function createCookies(req, res, func) {

        var cookie = req.cookies.cookieName;
        if (cookie === undefined) {
            var stringLength = 30;
            // list containing characters for the random string
            var stringArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c',
                'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
                'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?'];
            var rndString = "";
            // build a string with random characters
            for (var i = 1; i < stringLength; i++) {
                var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
                rndString = rndString + stringArray[rndNum];
            }
            cookie = rndString;
        }
        //console.log(cookie)         
        func.call(this, cookie, { maxAge: 1000 * 60 * 15, httpOnly: true });
    }
})
module.exports = routeAdmin