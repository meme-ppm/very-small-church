'use strict';
var serviceParish = require('../services/parish');
var servicePlace = require('../services/place');

module.exports = [
    {
        method: ['GET'],
        path: '/admin/parish/{parishId}/place',
        handler:function(request, reply){
            serviceParish.findOne(request.params.parishId, function(error, parish){
                if(parish.places == null || parish.places.length === 0){
                    reply.redirect('admin/parish/placeCreate', {parish:parish})
                }else{
                    reply.view('admin/parish/place', {parish:parish});
                }
            })   
        }
    },
    {
        method: ['POST'],
        path: '/admin/parish/{parishId}/place',
        handler:function(request, reply){
            servicePlace.create(request.payload, function(error, place){
                reply.redirect('/admin/parish/'+place.parishId+'/place');
            });
        },
    },
    {
        method: ['GET'],
        path: '/admin/parish/{parishId}/place/create',
        handler:function(request, reply) {
            serviceParish.findOne(request.params.parishId, function(error, parish){
                reply.view('admin/parish/placeCreate', {parish:parish});
            })
            
        }
    }
]