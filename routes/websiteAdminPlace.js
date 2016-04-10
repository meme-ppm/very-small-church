'use strict';
var serviceParish = require('../services/parish');
var servicePlace = require('../services/place');
var _ = require("underscore");

module.exports = [
    {
        method: ['GET'],
        path: '/admin/parish/{parishId}/place',
        handler:function(request, reply){
            serviceParish.findOne(request.params.parishId, function(error, parish){
                if(parish.places == null || parish.places.length === 0){
                    reply.view('admin/parish/placeCreate', {parish:parish, payload:{}, currentMenu:'place'})
                }else{
                    reply.view('admin/parish/place', {parish:parish, currentMenu:'place'});
                }
            })   
        }
    },
    {
        method: ['POST'],
        path: '/admin/parish/{parishId}/place',
        handler:function(request, reply){
            if(request.payload.id){
                servicePlace.update(request.payload, function(error, place){
                    reply.redirect('/admin/parish/'+request.params.parishId+'/place');
                });
            }else{
                servicePlace.create(request.payload, function(error, place){
                    reply.redirect('/admin/parish/'+request.params.parishId+'/place');
                });
            }
        },
    },
    {
        method: ['get'],
        path: '/admin/parish/{parishId}/place/{placeId}',
        handler:function(request, reply){
            serviceParish.findOne(request.params.parishId, function(error, parish){
                var placeId = parseInt(request.params.placeId);
                var place = _.find(parish.places, function(item){
                    console.log(">>place: ", item)
                    return item.id === placeId;
                });
                console.log("placeId ", request.params.placeId)
                console.log("place ", place)
                reply.view('admin/parish/placeCreate', {payload:place, parish: parish, currentMenu:'place'})
            });
        }
    },
    {
        method: ['GET'],
        path: '/admin/parish/{parishId}/place/create',
        handler:function(request, reply) {
            serviceParish.findOne(request.params.parishId, function(error, parish){
                reply.view('admin/parish/placeCreate', {parish:parish, payload:{}, currentMenu:'place'});
            })
        }
    }
]