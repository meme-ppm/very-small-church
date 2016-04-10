var db = require('../utils/dbInit')();
var log = require('../utils/log')();

module.exports.create=function(event, callback){
    db.Event.create(event)
            .then(function(event){
                callback(null, event.get({plain:true}));
            })
            .catch(function(err){
                log.d('impossible to create event: ', err);
                callback(err);
            });
}

module.exports.update=function(event, callback){
    delete event.parishId;
    delete event.placeId;
    db.Event.update(event, {where : {id: event.id}})
            .then(function(count){
                callback(null);
            })
            .catch(function(err){
                log.d('impossible to create event: ', err);
                callback(err);
            });
}

module.exports.list=function(callback){
    db.Event.findAndCountAll()
            .then(function(events){
                callback(null, events);
                console.log("events ", events.get({plain:true}))
            })
            .catch(function(err){
                log.d('impossible to list of evetns: ', err);
                callback(err);
            });
}

module.exports.findOne = function(id, callback){
    db.Event.findOne({where: {id:parseInt(id)}})
                .then(function(event){
                    callback(null, place);
                })
                .catch(function(err){
                    log.d('impossible to find event: ', err);
                    callback(err);
                });
}