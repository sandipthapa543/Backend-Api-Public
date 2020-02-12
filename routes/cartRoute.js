const express = require('express');

//* install and import express validator package installing using
const { check, validationResult } = require('express-validator');

//* import auth file from middleware package
const checkToken = require('../middleware/auth');

// import router
const router = express.Router();

//* import userController file from controller package
const cartController = require('../controller/cartController');

const cartDetails = new cartController();


const validateAllFields = () => [
    //* name valaidation
    check('product')
        .notEmpty().withMessage('Product is required.'),
    //* last name validation
    check('status')
        .notEmpty().withMessage('Status field is required.')


];

//* post  form api router
// eslint-disable-next-line consistent-return
router.post('/', checkToken,validateAllFields(), (req, res) => {
    const error = validationResult(req); //* field validation request
    if (!error.isEmpty()) {
        return res.status(400).json(error.array());
    }
    cartDetails.createNewCart(req, res);
});

router.post('/', checkToken,validateAllFields(), (req, res) => {
    const error = validationResult(req); //* field validation request
    if (!error.isEmpty()) {
        return res.status(400).json(error.array());
    }
    cartDetails.createNewCart(req, res);
});

//*
//get api router
router.get('/', [checkToken, cartDetails.cartList]);

//* update api router

router.put('/:id', [checkToken, cartDetails.updateCart])


//* delete api router
router.delete('/:id', [checkToken, cartDetails.deleteCart]);

module.exports = router;
