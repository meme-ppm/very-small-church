'use strict';
var serviceParish = require('../services/parish');
var serviceEvent = require('../services/event');
var _ = require("underscore");

module.exports = [
    {
        method: ['GET'],
        path: '/admin/parish/{parishId}/event',
        handler:function(request, reply){
            serviceParish.findOne(request.params.parishId, function(error, parish){
                if(parish.events == null || parish.events.length === 0){
                    reply.view('admin/parish/eventCreate', {parish:parish, payload:{}, currentMenu:'event'})
                }else{
                    reply.view('admin/parish/event', {parish:parish, currentMenu:'event'});
                }
            })   
        }
    },
    {
        method: ['POST'],
        path: '/admin/parish/{parishId}/event',
        handler:function(request, reply){
            if(request.payload.id){
                serviceEvent.update(request.payload, function(error, event){
                    reply.redirect('/admin/parish/'+request.params.parishId+'/event');
                });
            }else{
                serviceEvent.create(request.payload, function(error, event){
                    reply.redirect('/admin/parish/'+request.params.parishId+'/event');
                });
            }
        },
    },
    {
        method: ['get'],
        path: '/admin/parish/{parishId}/event/{eventId}',
        handler:function(request, reply){
            serviceParish.findOne(request.params.parishId, function(error, parish){
                var eventId = parseInt(request.params.eventId);
                var event = _.find(parish.events, function(item){
                    return item.id === eventId;
                });
                reply.view('admin/parish/eventCreate', {payload:event, parish: parish, currentMenu:'event'})
            });
        }
    },
    {
        method: ['GET'],
        path: '/admin/parish/{parishId}/event/create',
        handler:function(request, reply) {
            serviceParish.findOne(request.params.parishId, function(error, parish){
                reply.view('admin/parish/eventCreate', {parish:parish, payload:{}, currentMenu:'event'});
            })
            
        }
    }
]