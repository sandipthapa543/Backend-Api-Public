const mongoose = require('mongoose');

const { Schema } = mongoose;

//* product table schema in mongodb

const productSchema = new Schema({

    productImage: {
        type: String,
        required: true,
    },

    productName: {
        type: String,
        required: true,

    },
    brandId: {
        type: String,
        required: true
    },

    productPrice: {
        type: Number,
        required: true,

    },

    productDescription: {
        type: String,
        required: true,

    },
    productStock: {
        type: Number,
        required: true,
    },
    productStatus: {
        type: String,
        enum: ['Published', 'Unpublished'],
        required: true,
    },

    productCategory: {
        type: String,
        ref: 'Category',
        required: true,
    }

});
//* Creating Table in Database
const Product = mongoose.model('Product', productSchema);
module.exports = Product
class ProductModel {
     getAllProducts (perPage, page, filters) {
         let conditions = filters.brand ? { 'brandId': filters.brand} : {}
         console.log(filters)
        return new Promise((resolve, reject) => {
            Product.
            find({"productName" : { $regex: filters.search || '', $options: 'i' }})
                .where(conditions)
                // .limit(parseInt(perPage))
                // .skip(parseInt(page))
                .exec(function (err, course) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(course);
                    }
                })
        })
    }
     createProducts (courseData)  {
        return new Promise((resolve, reject)=> {
            Product.create(courseData, (error, response) => {
                if(error){
                    reject(error);
                }
                else {
                    resolve(response)
                }
            })

        })

    }


    getProductByBrand  (brandsId) {
        return new Promise((resolve, reject)=> {
            Product.find({})
                .exec(function(error, response) {
                if(error){
                    reject(error);
                }
                else {
                    resolve(response)
                }
            });
        })
    }

    findProductById  (id) {
        return new Promise((resolve, reject)=> {
            Product.findOne({_id: id})
                .exec(function(error, response) {
                if(error){
                    reject(error);
                }
                else {
                    resolve(response)
                }
            });
        })
    }
    updateProductsDetail  (courseId, courseData) {
        return new Promise((resolve, reject)=> {
            Product.findByIdAndUpdate(courseId, courseData,(error, response) => {
                if(error){
                    reject(error);
                }
                else {
                    resolve(response)
                }
            });
        })
    }

     deleteProducts (courseId)  {
        return new Promise((resolve, reject)=> {
            Product.findByIdAndRemove(courseId, (error, response) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(response)
                }
            })
        })
    }
}
module.exports = ProductModel

