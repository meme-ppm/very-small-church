var config = require('./config');
var Squelize = require('sequelize');

"use strict";

var db;

module.exports = function(){
    if(db == null){
        db = new Squelize(config.db);
        this.Parish = require('../models/parish')(db);
        this.Place = require('../models/place')(db);
        
        this.Parish.hasMany(this.Place);
        db.sync();
    }
    return this;
}


