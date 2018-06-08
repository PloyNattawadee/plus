const cookieHelper = require('express').Router()
const cookieParser = require('cookie-parser');
//cookieHelper.use(cookieParser());
const express = require('express');
const app = express();

app.use(function cookieParser(req, res, next) {
    // check if client sent cookie
    let cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        let stringLength = 30;
        // list containing characters for the random string
        let stringArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 
        'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
         'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
         'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?'];
         let rndString = "";

        // build a string with random characters
        for (let i = 1; i < stringLength; i++) {
            let rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
            rndString = rndString + stringArray[rndNum];
        }
        res.cookie('name',rndString, {path: '/account/login', maxAge: 1000 * 60 * 15, httpOnly: true , signed: true })
        console.log(rndString)

    } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
    }
    next(); // <-- important!
})

//odule.exports = app