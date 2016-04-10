'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
const log = require('./utils/log')();

server.connection({port:3000});

server.register(
    {
      register: require( "hapi-i18n" ),
      options: {
        locales: ["fr"],
        defaultLocale: 'fr',
        directory: __dirname + "/locales"
      }
  },
  function ( err ){
    if ( err ){
       log.d("i18n error ", err);
    }
  }
);

server.register(require('vision'), (err) => {
    if(err){
      log.d("jade error ", err);
      throw err;
    }
    server.views({
       engines: { jade: require('jade') },
        path: __dirname + '/public/templates',
        compileOptions: {
            pretty: false
        },
        isCached:false,
        layout: false
    });
});


/***********************************
*******      WEBSITE       *********
************************************/
server.register(require('inert'), (err) => {
  if(err){
    log.d("static content error ", err);
    throw err;
  }
  server.route(require('./routes/websiteStatic'));
});

server.route(require('./routes/websiteAdminPlace'));
server.route(require('./routes/websiteAdminEvent'));
server.route(require('./routes/websiteAdmin'));

server.route(require('./routes/websiteParish'));

server.start((err) =>{
  if(err){
    throw err;
  }
  console.log("Server running at:", server.info.uri);
});
