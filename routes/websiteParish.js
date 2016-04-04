"use strict";

var serviceParish = require("../services/parish");

module.exports = [
    {
        method: ['GET'],
        path: '/parish/{parishId}',
        handler:function(request, reply){
            serviceParish.findOne(request.params.parishId, function(error, parish){
                reply.view('front/parish', {parish:parish})
            })   
        }
    },
    
]