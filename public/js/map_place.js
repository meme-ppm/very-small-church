"use strict";

function MapPlace(){
    this.$address = $("#address");
    this.$addressFinal = $("#address-final");
    this.$lat=$("#lat");
    this.$lng=$("#lng");
    this.$addressGeocodingError=$("#address-geocoding-error");
    this.lastTimeAddressUpdate;
    this.$address.on('input', $.proxy(this.onAddressUpdate, this));
    this.geocoder = new google.maps.Geocoder();
    var currentMarker = null;
}

MapPlace.prototype.load = function(){
    this.loadMap();
};

MapPlace.prototype.loadMap = function(){
    var mapParams = {
                        zoom: 8,
                        center: {lat: 48.853081, lng: 2.349859}
                    }
  
    if(this.$lat.val().length !== 0){
        var latLng = {lat: parseFloat(this.$lat.val()), lng: parseFloat(this.$lng.val())}
        mapParams.center=latLng;
        this.currentMarker = new google.maps.Marker({
            position: latLng
        });
        mapParams.zoom = 16;
    }
    this.gmap = new google.maps.Map(document.getElementById('map'), mapParams);
    if(this.currentMarker){
        this.currentMarker.setMap(this.gmap);
    }
}

MapPlace.prototype.onAddressUpdate = function(){
    if(this.tiemoutAddress){
        clearTimeout(this.tiemoutAddress);
    }
    this.tiemoutAddress = setTimeout ($.proxy(this.onAddressFinishToUpdate, this), 1000);
};

MapPlace.prototype.onAddressFinishToUpdate = function(){
    var address = this.$address.val();
    if(address.length !==0 && (this.previousVal == null || this.previousAddress !==address) ){
        this.$addressGeocodingError.addClass('hide');
        this.geocoder.geocode({'address': address}, $.proxy(this.onGeocode, this));
    }
};
                              
MapPlace.prototype.onGeocode = function(results, status){
    if (status === google.maps.GeocoderStatus.OK) {
        var result = results[0];
        this.gmap.setCenter(result.geometry.location);
        this.$lat.val(result.geometry.location.lat());
        this.$lng.val(result.geometry.location.lng());
        this.$addressFinal.val(result.formatted_address);
        this.gmap.setZoom(16)
        this.currentMarker.setPosition(results[0].geometry.location);
    } else {
        console.log("error while geocoding ", status);
        this.$addressGeocodingError.removeClass('hide');
    }
};

function onMapInit(){
    new MapPlace().load();
}