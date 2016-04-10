var config = require('./config');
var Sequelize = require('sequelize');

"use strict";

var db;

module.exports = function(){
    if(db == null){
        db = new Sequelize(config.db);
        this.Parish = require('../models/parish')(db);
        this.Place = require('../models/place')(db);
        this.Event = require('../models/event')(db);
        this.Parish.hasMany(this.Place);
        this.Parish.hasMany(this.Event);
        this.Event.belongsTo(this.Place);
        db.sync();
    }
    return this;
}


