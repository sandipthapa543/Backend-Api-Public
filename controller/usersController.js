const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../model/userModel');
const config = require('../config');


//* creating user class for RESTful API

class Users {
    //* userList for get request and response
    // eslint-disable-next-line class-methods-use-this
    userList(req, res) {
        users.find({}).limit(10).exec((error, result) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(result);
            }
        });
    }

    //* Sign Up  API users Post request and response
    // eslint-disable-next-line class-methods-use-this
    createUser(req, res) {
        const userData = {
            first_Name: req.body.first_Name,
            last_Name: req.body.last_Name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password), //* password security hash function
            phone: req.body.phone,
            address: req.body.address,
        };

        users.create(userData,(error,result) => {
            if (error) {
                res.status(400).json('cannot find');
            } if (result) {
                res.status(201).json(

                    { message:'successful signup'}
                    );
            }
        });
    }


    //* login api with jsonwebtoken users Post request and response

    // eslint-disable-next-line class-methods-use-this
    logIn(req, res) {
        const userValidation = {
            email: req.body.email,
            password: req.body.password,

        };

        //* verify user attempt to login
        // eslint-disable-next-line consistent-return
        users.findOne({ email: userValidation.email }).exec((error, result) => {
            if( !error && !result) {
                res.status(400).json(
                    {success: false, message: "Username and password does not match."}
                )
            }
            if (error) {
                return res.status(400).json(
                    {
                        success: false,
                        message: 'Invalid Email.',
                    },
                );
            }
            if (result) {
                console.log('Entered')
                bcrypt.compare(userValidation.password, result.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ data: result }, config.secret, { expiresIn: '24h' });
                        const id = users._id
                        res.status(200).json({
                            status:"Login success!",
                        token,id

                        });
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Invalid Password.',
                        });
                    }
                });
            }
        });
    }

    // * PUT API for user edit
    // eslint-disable-next-line class-methods-use-this
    updateUser(req, res) {
        const userUpdate = {
            first_Name: req.body.first_Name,
            last_Name: req.body.last_Name,
            phone: req.body.phone,
            address: req.body.address,
        };

        //* Users is searched by Id to edit
        users.findOneAndUpdate({_id: req.params.id}, userUpdate, (error, result) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(201).json(result);
            }
        });
    }

    //* Delete API for user deletion
    // eslint-disable-next-line class-methods-use-this
    deleteUser(req, res) {
        users.findByIdAndRemove(req.params.id, (error, result) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(201).json(result);
            }
        });
    }

    // eslint-disable-next-line class-methods-use-this
    userMe(req,res){
        let token = req.headers['x-access-token'] || req.headers.authorization;

        if (token) {
            if (token.startsWith('Bearer')) {
                token = token.slice(7, token.length);
            }
            // eslint-disable-next-line consistent-return
            jwt.verify(token, config.secret, (erorr, decoded) => {
                if (erorr) {
                    return res.json({
                        sucess: false,
                        message: 'Token is not valid',
                    });
                }
                else{
                    users.findOne({_id: decoded.data._id})
                    .then((result)=> {
                        res.status(200).send(result)
                    })
                        .catch((err)=> {
                            res.status(403).json({
                                success: false
                            })
                        })
                }
            });


        }


    }
}


//* export class Users for Routing API
module.exports = Users;
