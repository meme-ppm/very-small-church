'use strict';
var serviceParish = require('../services/parish');
var servicePlace = require('../services/place');


module.exports = [
  {
    method: ['GET'],
    path: '/admin',
    handler: function (request, reply) {
        serviceParish.list(function(error, parishes){
            if(error){
                throw error;
            }
            reply.view('admin/index', {parishes:parishes});
        });
      
    }
  },
  {
    method: ['POST'],
    path: '/admin/parish',
    handler:function(request, reply) {
        serviceParish.create(request.payload, function(error, parish){
            reply.redirect('/admin');
        });
    }
  },
  {
    method: ['GET'],
    path: '/admin/parish/{parishId}',
    handler:function(request, reply) {
        serviceParish.findOne(request.params.parishId, function(error, parish){
            if(parish.places == null || parish.places.length === 0){
                reply.redirect('admin/parish/placeCreate', {parish:parish})
            }else{
                reply.view('admin/parish/place', {parish:parish});
            }
        })
    }
  }

];
