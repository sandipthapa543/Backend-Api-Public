const mongoose = require('mongoose');

const { Schema } = mongoose;

//* cart table schema in mongodb

const cartSchema = new Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },

    status: {
        type: String,
        enum: ['Cart', 'Checkout'],
        required: true,
    },

    user: {
        type: String
    }

});
//* Creating Table in Database
const Cart = mongoose.model('Cart', cartSchema);

class CartModel {
     getAllCarts  (perPage, page, filters)  {
        return new Promise((resolve, reject) => {
            Cart.find({status: "Cart"})
                .populate('user', 'product')
                .limit(parseInt(perPage))
                .skip(parseInt(page))
                .exec(function (err, course) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(course);

                    }
                })
        })

    }


     createCarts  (courseData) {
        return new Promise((resolve, reject)=> {
            Cart.create(courseData, (error, response) => {
                if(error){
                    reject(error);
                }
                else {
                    resolve(response)
                }
            })

        })

    }

     updateCartDetails  (courseId, courseData)  {
        return new Promise((resolve, reject)=> {
            Cart.findByIdAndUpdate(courseId, courseData,(error, response) => {
                if(error){
                    reject(error);
                }
                else {
                    resolve(response)
                }
            });
        })
    }

    deleteCarts  (courseId)  {
        return new Promise((resolve, reject)=> {
            Cart.findByIdAndRemove(courseId, (error, response) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(response)
                }
            })
        })
    }
}

module.exports = CartModel