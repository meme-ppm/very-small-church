"use strict";

function MapPlace(){
    this.$pois = $('.place');
    this.currentPoi = this.$pois.first();
    this.strPlaceId = "placeId";
    this.currentMarker = null;
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
    var isFirst = true;
    this.$pois.each(function(){
        var $poi = $(this);
        var latLng = {lat: $poi.data('lat'), lng:$poi.data('lng')}

        var marker = new google.maps.Marker({
            map: that.gmap,
            position : latLng,
            placeId: $poi.attr('id'),
        });
        marker.addListener('click', function(e){
          if(this !== that.currentMarker){
            that.gmap.panTo(this.getPosition());
            $("#"+that.currentMarker.placeId).addClass('hide');
            $("#"+this.placeId).removeClass('hide');
            that.currentMarker = this;
          }

        })
        if(isFirst){
          that.currentMarker = marker;
        }
    })
}

function onMapInit(){
    new MapPlace().load();
}
