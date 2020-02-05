const express = require('express');
const uploads = require('../fileupload/upload')
//* install and import express validator package installing using
const { check, validationResult } = require('express-validator');

//* import auth file from middleware package
const checkToken = require('../middleware/auth');

// import router
const router = express.Router();

//* import userController file from controller package
const brandController = require('../controller/brandController');

const brandDetails = new brandController();


const validateAllFields = () => [
    //* name valaidation
    check('brandName')
        .notEmpty().withMessage('Brand name is required.'),
    //* last name validation
    check('brandImage')
        .notEmpty().withMessage('Image field is required.')


];

//* post  form api router
// eslint-disable-next-line consistent-return
router.post('/',  uploads.any(), validateAllFields(), (req, res) => {
    const error = validationResult(req); //* field validation request
    if (error.isEmpty()) {
        return res.status(400).json(error.array());
    }
    brandDetails.createNewBrand(req, res);
});

//* get api router
router.get('/all', brandDetails.brandList);


//* update api router

router.put('/:id', [checkToken, brandDetails.updateBrand])


//* delete api router
router.delete('/:id', [checkToken, brandDetails.deleteBrand]);

module.exports = router;
