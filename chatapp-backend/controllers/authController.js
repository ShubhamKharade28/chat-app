const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Friend = require('../models/Friends');
const Request = require('../models/Request');

const register = (req,res,next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if(err){
            res.json({
                error: err,
                userRegistered: false
            });
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: hashedPass
        });

        let friend = new Friend({
            user: req.body.username,
            friends: []
        });

        let request = new Request({
            user: req.body.username,
            requests: []
        })

        user.save()
        .then(user => {
            
            friend.save();
            request.save();

            res.json({
                error: false,
                userRegistered: true
            })
        })
        .catch(dbError => {
            console.log(dbError);
            res.json({
                error: dbError,
                userRegistered: false
            })
        })
    })
}

const login = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({$or: [{email:username},{username:username}]})
    .then(user =>{
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    res.json({
                        userFound: true,
                        passwordMatched: false,
                        error: 'Wrong Password'
                    });
                }
                if(result){
                    res.json({
                        userFound: true,
                        passwordMatched: true,
                        user: {
                            email: user.email,
                            username: user.username,
                        }
                    });
                }
                else{
                    res.json({
                        userFound: true,
                        passwordMatched: false,
                        error: false,
                        user: {
                            email: user.email,
                            username: user.username
                        }
                    })
                }
            })
        }
        else{
            res.json({
                userFound: false,
                error: 'User not found',
                passwordMatched: false,
            });
        }
    })
}

module.exports = {
    register, login
}