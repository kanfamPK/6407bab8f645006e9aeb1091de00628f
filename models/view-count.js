var mongoose = require('mongoose');

var viewCountSchema = new mongoose.Schema({
    count: Number,
    UniqueId: String
})

var ViewCount = mongoose.model('ViewCount', viewCountSchema, 'ViewCount');

module.exports = ViewCount;