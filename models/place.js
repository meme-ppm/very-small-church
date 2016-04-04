var Sequelize = require('sequelize');

module.exports = function(db){
    return db.define('place',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{type:Sequelize.STRING},
        address:{type:Sequelize.STRING},
        lat:{type:Sequelize.DOUBLE},
        lng:{type:Sequelize.DOUBLE},
        isAssociatedToParish:{type:Sequelize.BOOLEAN},
        type:{type:Sequelize.STRING}
    });
}