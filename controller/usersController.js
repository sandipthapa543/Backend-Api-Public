const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../model/users');
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

        users.create(userData, (error, result) => {
            if (error) {
                res.status(400).json('cannot find');
            } if (result) {
                res.status(201).json('successful signup');
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
            if (error) {
                return res.status(400).json(
                    {
                        success: false,
                        message: 'Invalid Email.',
                    },
                );
            }
            if (result) {
                bcrypt.compare(userValidation.password, result.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ data: result }, config.secret, { expiresIn: '24h' });
                        res.status(200).json({
                            token,
                        });
                    } else {
                        res.status(400).json({
                            sucess: false,
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
            first_Name: req.body.firstName,
            last_Name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
        };

        //* Users is searched by Id to edit
        users.findByIdAndUpdate(req.params.id, userUpdate, (error, result) => {
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
    meUser(req, res) {
        users.findOne(req.params.id, (error, result) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(201).json(result);
            }
        });
    }
}


//* export class Users for Routing API
module.exports = Users;
