var express = require('express');
var router = express.Router(); 

require('../models/connection');
const User = require('../models/users');


const { checkBody } = require('../modules/checkBody')

router.post('/signup', (req, res) => {
    //console.log(req.body);
    const newUser = new User ({        
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    if (!checkBody(req.body, ["name", "email", "password"])) {
        res.json({result: false, error: 'Missing or empty fields'})
    }

    else {
    User.findOne({email: req.body.email}).then(data => {
        if(data === null) {
            newUser.save().then(() => {
                res.json({result: true})
            })
        }
        else {
            res.json({result: false, error: 'User already exists'})
        }
    })}
    
})

router.post('/signin', (req, res) => {
    if (!checkBody(req.body, ["email", "password"])) {
        res.json({result: false, error: 'Missing or empty fields'});
    }
    else {
    User.findOne({email: req.body.email, password: req.body.password}).then(data => {
        //console.log(data)
       if (data) {
            res.json({result: true})
        }
        else {
            res.json({result: false, error: 'User not found'})
        }
       //res.json({test: 'testing'})
    })}

})

module.exports = router;