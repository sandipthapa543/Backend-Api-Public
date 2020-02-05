const mongoose = require('mongoose');

const { Schema } = mongoose;

//* brand table schema in mongodb

const brandSchema = new Schema({

    brandImage: {
        type: String,
        required: true,
    },

    brandName: {
        type: String,
        required: true,
    }

});
//* Creating Table in Database
const Brand = mongoose.model('Brand', brandSchema);

class BrandModel {
     getAllBrands (perPage, page, filters) {
        return new Promise((resolve, reject) => {
            Brand.find()
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


    createBrands (courseData) {
        return new Promise((resolve, reject)=> {
            Brand.create(courseData, (error, response) => {
                if(error){
                    reject(error);
                }
                else {
                    resolve(response)
                }
            })

        })

    }

      updateBrandsDetail  (courseId, courseData) {
        return new Promise((resolve, reject)=> {
            Brand.findByIdAndUpdate(courseId, courseData,(error, response) => {
                if(error){
                    reject(error);
                }
                else {
                    resolve(response)
                }
            });
        })
    }

     deleteBrands  (courseId)   {
        return new Promise((resolve, reject)=> {
            Brand.findByIdAndRemove(courseId, (error, response) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(response)
                }
            })
        })
}

}

module.exports = BrandModel

