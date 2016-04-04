var db = require('../utils/dbInit')();
var log = require('../utils/log')();

module.exports.create=function(parish, callback){
    db.Parish.create(parish)
            .then(function(parish){
                callback(null, parish.get({plain:true}));
            })
            .catch(function(err){
                log.d('impossible to create parish: ', err);
                callback(err);
            });
}

module.exports.list=function(callback){
    db.Parish.findAndCountAll()
            .then(function(parishes){
                callback(null, parishes.get({plain:true}));
            })
            .catch(function(err){
                log.d('impossible to list of parishes: ', err);
                callback(err);
            });
}

module.exports.findOne = function(id, callback){
    db.Parish.findOne({where: {id:parseInt(id)}, include: [Place]})
                .then(function(parish){
                    callback(null, parish.get({plain:true}));
                }).catch(function(err){
                    log.d('impossible to find parish: ', err);
                    callback(err);
                });
}