const express = require('express');

//* install and import express validator package installing using
const { check, validationResult } = require('express-validator');

//* import auth file from middleware package
const checkToken = require('../middleware/auth');
const uploads = require('../fileupload/upload')

// import router
const router = express.Router();

//* import userController file from controller package
const productController = require('../controller/productController');

const productDetails = new productController();


const validateAllFields = () => [
    //* name valaidation
    check('productName')
        .notEmpty().withMessage('Product name is required.'),
    //* last name validation
    check('brandId')
        .notEmpty().withMessage('Brand field is required.')


];

//* post  form api router
// eslint-disable-next-line consistent-return
router.post('/', uploads.any(), validateAllFields(), (req, res) => {
    const error = validationResult(req); //* field validation request
    if (!error.isEmpty()) {
        return res.status(400).json(error.array());
    }
    productDetails.createNewProduct(req, res);
});

//* get api router
router.get('/', productDetails.productList);
//* get api router
router.get('/:id', productDetails.findProduct);

router.get('/brand/:brandId', productDetails.listProductBrand);

//* update api router
router.put('/:id', [checkToken, productDetails.updateProduct]);

//* delete api router
router.delete('/:id', [checkToken, productDetails.deleteProduct]);

//* export router to another package
module.exports = router;
