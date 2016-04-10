var Sequelize = require('sequelize');

module.exports = function(db){
    return db.define('event',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{type:Sequelize.STRING},
        description:{type:Sequelize.STRING},
        type:{type:Sequelize.STRING},
        dateStart:{type:Sequelize.DATE},
        dateEnd:{type:Sequelize.DATE}
    });
}