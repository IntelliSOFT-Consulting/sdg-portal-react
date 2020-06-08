const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = 'mysecretshhh';
const withAuthentication = require('../../middleware');

exports.create = function(req, res){
    const {email, password} = req.body;
    const user = new User({email, password});
    user.save(function(err){
        if(err){
            res.status(500)
            .send('Error registering new user');
        }else{
            res.status(200)
            .send('Welcome')
        }
    })
}

exports.authenticate = function(req, res, next){
    const {email, password} = req.body;
    User.findOne({ email }, function(err, user){
        if(err){
            console.error(err);
            res.status(500)
            .json({
                error: 'Internal error please try again'
            });
        }else if(!user){
            return next();
        }else{
            user.isCorrectPassword(password, function(err, same){
                if(err){
                    res.status(500)
                    .json({
                        error: 'Internal error, try again'
                    })
                }else if(!same){
                    return next();
                }else{
                    const payload = {email};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, {httpOnly: true, signedCookie: true})
                    .send({ screen: email });
                }
            })
        }
    })
}

exports.withAuth = function(req, res){
        res.sendStatus(200)
}

exports.logOut = function(req, res){
    res.clearCookie('token').end();
}

exports.readCookie = function(req, res){
    //console.log(req)
}