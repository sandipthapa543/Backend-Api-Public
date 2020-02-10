const brandModel = require("../model/brandModel") ;
const BrandModel = new brandModel()


class BrandDetails{
    brandList (req, res) {
        let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        let filters = req.query || {}
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
        BrandModel.getAllBrands(limit, page, filters)
            .then((result) => {
                res.status(200).json(result);
            })
    }
    createNewBrand (req, res) {
        console.log(req.files)
        const brandData = {
            brandImage: req.files[0].filename,
            brandName: req.body.brandName,
        }
        BrandModel.createBrands(brandData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }
    updateBrand (req, res) {
        BrandModel.updateBrandsDetail(req.params.id, req.body)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }


    deleteBrand (req, res) {
        BrandModel.deleteBrands(req.params.id)
            .then((result)=> {
                res.status(200).send(result)
            })
    }


}
module.exports = BrandDetails;