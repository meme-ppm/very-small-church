var db = require('../utils/dbInit')();
var log = require('../utils/log')();

module.exports.create=function(place, callback){
    db.Place.create(place)
            .then(function(place){
                callback(null, place.get({plain:true}));
            })
            .catch(function(err){
                log.d('impossible to create place: ', err);
                callback(err);
            });
}

module.exports.list=function(callback){
    db.Place.findAndCountAll()
            .then(function(places){
                callback(null, places);
                console.log("placees ", placees.get({plain:true}))
            })
            .catch(function(err){
                log.d('impossible to list of placees: ', err);
                callback(err);
            });
}

module.exports.findOne = function(id, callback){
    db.Place.findOne({where: {id:parseInt(id)}})
                .then(function(place){
                    callback(null, place);
                })
                .catch(function(err){
                    log.d('impossible to find place: ', err);
                    callback(err);
                });
}