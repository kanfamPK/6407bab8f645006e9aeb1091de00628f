var shortid = require('shortid');
// var db = require('../db.js');
var Session = require('../models/sessions-model.js');
var ViewCount = require('../models/view-count.js');

module.exports = async function(req,res,next){
    if (!req.signedCookies.sessionId){
        var countNumber = await ViewCount.find({UniqueId: "ThisIsViewCountId"});
        countNumber[0].count += 1;
        await countNumber[0].save();
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