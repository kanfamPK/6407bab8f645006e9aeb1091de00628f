var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    _id: String,
    name: String,
    image: String,
    description: String
})

var Products = mongoose.model('Products', productSchema, 'products'); // Products đầu là tên model, products sau 
                                                                        // là tên collection trong mongodb
module.exports = Products;