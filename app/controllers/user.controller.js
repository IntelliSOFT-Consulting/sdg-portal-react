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
                    .sendStatus(200);
                    console.log(token)
                }
            })
        }
    })
}

exports.withAuth = function( req, res){
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = User.findById(req.user.id);
        res.json(user);
        res.sendStatus(200);
        console.log(res.json(user))
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
        console.log("Error")
      }
}

exports.logOut = function(req, res){
    res.clearCookie('token').end();
}

exports.readCookie = function(req, res){
    //console.log(req)
}


// Retrieve and return all files from the database.
exports.findAll = function (req, res) {
      console.log(res)
      User.get(function(err, users){
          if(err){
              res.json({
                  status: 'error',
                  message: err,
              });
          }

          res.json({
              status: "success",
              message: "Files retrieved successfully",
              data: users
          })
      })
    };