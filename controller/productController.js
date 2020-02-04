const productModel = require("../model/productModel") ;
const ProductModel = new productModel()


class ProductDetails {
    productList (req, res) {
        let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        let filters = req.filters
        let page = 0;
        if (req.query) {
            if(req.query.name){
                filters = req.query.filters
            }
            if (req.query.page) {
                req.query.page = parseInt(req.query.page);
                page = Number.isInteger(req.query.page) ? req.query.page : 0;
            }
        }
        ProductModel.getAllProducts(limit, page, filters)
            .then((result) => {
                res.status(200).json({
                    count: result.length,
                    next: result.length === limit ? '' : '',
                    prev: '',
                    result: result
                });
            })
    }
    createNewProduct (req, res) {
        const productData = {
            productImage: req.files[0].filename,
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productDescription: req.body.productDescription,
            productStock: req.body.productStock,
            productStatus: req.body.productStatus,
            productCategory: req.body.productCategory
        }
        ProductModel.createProducts(productData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }
    updateProduct (req, res) {
        let courseData = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName
        }

        ProductModel.updateProductsDetail(req.params.id, courseData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }


    deleteProduct (req, res) {
        ProductModel.deleteProducts(req.params.id)
            .then((result)=> {
                res.status(200).send(result)
            })
    }


}

module.exports = ProductDetails