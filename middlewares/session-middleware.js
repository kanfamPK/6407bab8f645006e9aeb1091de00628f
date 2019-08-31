var shortid = require('shortid');
var db = require('../db.js');
var Session = require('../models/sessions-model.js');

module.exports = function(req,res,next){
    if (!req.signedCookies.sessionId){
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId,{signed: true});
        var session = new Session({ sessionId : sessionId, cart : {} });
        session.save();
        // db.get('sessions').push({
        //     id: sessionId
        // }).write();
    }

    next();
}