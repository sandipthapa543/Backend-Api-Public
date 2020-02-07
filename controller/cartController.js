const cartModel = require("../model/cartModel") ;
const CartModel = new cartModel();


class CartDetails {
    cartList (req, res) {
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
        CartModel.getAllCarts(limit, page, filters)
            .then((result) => {
                res.status(200).json(
                    result
                );
            })
    }
    createNewCart (req, res) {
        const cartData = {
            product: req.body.product,
            status: req.body.status,
            user: req.body.user,
        }
        CartModel.createCarts(cartData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }
    updateCart (req, res) {
        let courseData = {
            status: req.body.status,
        }

        CartModel.updateCartDetails(req.params.id, courseData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }


    deleteCart (req, res) {
        CartModel.deleteCarts(req.params.id)
            .then((result)=> {
                res.status(200).send(result)
            })
    }


}
module.exports = CartDetails