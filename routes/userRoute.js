const express = require('express');

//* install and import express validator package installing using
const { check, validationResult } = require('express-validator');

//* import auth file from middleware package
const checkToken = require('../middleware/auth');


// import router
const router = express.Router();

//* import userController file from controller package
const usersController = require('../controller/usersController');

const usersDetails = new usersController();


const validateAllFields = () => [
    //* name valaidation
    check('first_Name')
        .notEmpty().withMessage('Please enter your first Name')
        .isAlpha()
        .withMessage('Name must contain alphabets')
        .isLength({ min: 3 })
        .withMessage('Name must contain atleast 3 alphabets'),

    //* last name validation
    check('last_Name')
        .notEmpty().withMessage('Please enter your last name')
        .isAlpha()
        .withMessage('Last Name must contain alphabets')
        .isLength({ min: 2 })
        .withMessage('Last Name must contain atleast 2 alphabets'),

    //* email validation
    check('email')
        .notEmpty().withMessage('Please enter your email')
        .isEmail()
        .withMessage('Please enter the valid Email'),


    //* password validation
    check('password')
        .notEmpty().withMessage('Required Password')
        .isLength({ min: 7 })
        .withMessage('Password should not be empty, minimum eigh characters, at least one letter, one number and one special character'),


    //* confirm password validation
    // check('Confirm_Password')
    // .custom(Confirm_Password =>{
    //  if(Password !== Confirm_Password){
    //         throw new Error('Password do not match with confirm password')
    //     }
    // }),

    //* phone no validation
    check('phone')
        .notEmpty().withMessage('Required mobile number')
        .isLength({ max: 10 })
        .withMessage('Invalid mobile number')
        .isNumeric()
        .withMessage('Mobile No. should be numeric'),


    //* address validation
    check('address')
        .notEmpty().withMessage('Required Address'),

];

//* post  form api router
// eslint-disable-next-line consistent-return
router.post('/SignUp', validateAllFields(), (req, res) => {
    const error = validationResult(req); //* field validation request

    if (!error.isEmpty()) {
        return res.status(400).json(error.array());
    }
    usersDetails.createUser(req, res);
});

//* get api router
router.get('/admin', [checkToken, usersDetails.userList]);

router.get('/me',checkToken,usersDetails.userMe);

//* update api router

router.put('/:id', [checkToken, validateAllFields(), usersDetails.updateUser]);

//* delete api router
router.delete('/:id', [checkToken, usersDetails.deleteUser]);

router.post('/login', [validateAllFields(), usersDetails.logIn]);
//* export router to another package
module.exports = router;
