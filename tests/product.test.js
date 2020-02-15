// use the path of my model
const brandModel = require("../model/brandModel") ;
const BrandModel = new brandModel()
const mongoose = require('mongoose');

// the new name of the database
const url = 'mongodb://localhost:27017/testdb';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User API Tests', () => {
// the code below is for insert testing of user
    it('The following user will be added', () => {
        const user = {

           'brandName':'ford'
        };

        return BrandModel.createBrands(user)
            .then((pro_ret) => {
                expect(pro_ret.brandName).toEqual('ford');
            });
    });

    //update testing


    // delete testing
    it('to tests the delete user is working or not', async () => {
        const status = await BrandModel.deleteBrands('5e47befc58aa023128d6b1e4');
    });
})