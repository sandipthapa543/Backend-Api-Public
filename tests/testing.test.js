// use the path of my model
const User = require('../model/userModel');
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
            'first_Name': 'Sandip',
            'last_Name':'thapa',
            'email':'sandip@gmail.com',
            'phone': '9862036520',
            'password':'sandip123',
            'address':'pkr1'
        };

        return User.create(user)
            .then((pro_ret) => {
                expect(pro_ret.first_Name).toEqual('Sandip');
            });
    });

    //update testing
    it('to tests the user details update', async () => {
        return User.findOneAndUpdate({email: 'sandip@gmail.com'}, {$set : {first_Name:'Sand'}})
            .then((pp)=>{
                expect(pp.first_Name).toEqual('Sandip')
            })

    });

    // delete testing
    it('to tests the delete user is working or not', async () => {
        const status = await User.deleteMany();
        expect(status.ok).toBe(1);
    });
})