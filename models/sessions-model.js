var mongoose = require('mongoose');
var sessionSchema = new mongoose.Schema({
    sessionId: String,
    cart: Array
})

var Sessions = mongoose.model('Sessions', sessionSchema, 'sessions'); // Sessions đầu là tên model, sessions sau 
                                                                        // là tên collection trong mongodb
module.exports = Sessions;