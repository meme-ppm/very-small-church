"use strict";
var Sequelize = require('sequelize');

module.exports = function(db){
    return db.define('parish', {
                                    id:{
                                        type: Sequelize.INTEGER,
                                        primaryKey: true,
                                        autoIncrement: true
                                    },
                                    name:{
                                        type:Sequelize.STRING, 
                                        unique:true
                                    }
                                }
                    );
}