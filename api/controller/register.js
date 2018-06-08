const Account = require('../model/db').Account
const Transaction = require('../model/db').Transaction
const route = require('express').Router()
const sequelize = require('../model/db')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');

route.get('/', (req, res) => {
    Account.findAll({
        order: [
            ['id', 'ASC'],
        ],
    }).then((account) => {
        res.status(200).json({
            status: '1',
        })
        console.log(account)
    }).catch((err) => {
        res.status(500).json({
            status: '0'
        })
        console.log(err);
    })
});
route.post('/login', (req, res) => {
    var email = req.body.email
    var password = req.body.password
    Account.findOne({
        where: {
            email: email
        }
    }).then((account) => {
        if (!account) {
            return res.json({
                status: 'Your Email is not found'
            })
        }
        if (!account.isValidPassword(password)) {
            return res.json({
                status: '0'
            })
        }
        //console.log("cookies : " + rndString)
        createCookies(req, res, (result) => {
            console.log("1111:" + result)
            //return res.cookie('cookieName', result, { maxAge: 1000 * 60 * 15, httpOnly: false })
            //res.send(req.cookie.result)
            //res.send(req.cookie.result)
            var gentranid = '1';
            Transaction.count('tranid').then((max) => {
                gentranid = "COOKIES-" + (max + 1);
                const cookies = {
                    tranid: gentranid,
                    tranname: result,
                    email: email
                }
                Transaction.create(cookies, (req, res) => {
                }).then((trans) => {
                    return res.json({
                        status: '1',
                        cookie: result
                    })
                })
                /*return res.json({
                    status: '1',
                    cookie: result

                })*/
            })
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
});
route.post('/register', (req, res) => {
    let employee = '1';
    Account.count('id').then((max) => {
        employee = "EM" + (max + 1);
    }).catch((err) => {
        res.send({
            status: "Failed"
        })
    })
    const email = req.body.email
    console.log("Email :" + email)
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, gethash) {
        Account.findOne({
            where: {
                email: email
            }
        }).then((account) => {
            if (account) {
                return res.json({
                    status: 'Duplicate'
                });

            } else {
                const accountData = {
                    id: employee,
                    email: req.body.email,
                    password: gethash
                };
                Account.create(accountData, (req, res) => {
                }).then((account) => {
                    res.status(201).json({
                        status: '1'
                    })

                }).catch((err) => {
                    console.log(err)
                    res.json({
                        status: '0'
                    })
                })
            }
        })
    })
});
/*route.post('/register', (req, res) => {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, gethash) {
        const accountData = {
            id: req.body.id,
            email: req.body.email,
            password: gethash,
        };
        Account.create(accountData, (err, result) => {
        }).then((account) => {
            console.log(account)
            res.status(201).json({
                status: '1'
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).json({
                status: '0',
            })
        })
    })
});*/
route.put('/update/:id', (req, res, next) => {
    const id = req.body.id
    Account.update({
        password: req.body.password
    }, {
            where: {
                id: id
            }
        }).then((account) => {
            console.log(account)
            res.json({
                status: '1'
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                status: '0'
            })
        })
});
route.delete('/delete/:id', (req, res, next) => {
    Account.findById(req.body.id)
    Account.update({
        password: req.bode.password
    }, {
            where: {
                id: req.body.id
            }
        }).then((account) => {
            console.log(account)
            res.status(201).json({
                status: '1'
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).json({
                status: '0'
            })
        })
})
module.exports = route