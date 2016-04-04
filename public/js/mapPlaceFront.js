"use strict";

function MapPlace(){
    this.$pois = $('.place');
    this.currentPoi = this.$pois.first();
}

MapPlace.prototype.load = function(){
    this.loadMap();
    this.displayPois();
};

MapPlace.prototype.loadMap = function(){
    this.gmap = new google.maps.Map(document.getElementById('map-place'), {
                            zoom: 12,
                            center: {lat: this.currentPoi.data('lat'), lng: this.currentPoi.data('lng')}
    });
}

MapPlace.prototype.displayPois = function(){
    var that = this;
    this.$pois.each(function(){
        var $poi = $(this);
        var marker = new google.maps.Marker({
            map: that.gmap,
            position : {lat: $poi.data('lat'), lng:$poi.data('lng')}
        });
    })
}

function onMapInit(){
    new MapPlace().load();
}