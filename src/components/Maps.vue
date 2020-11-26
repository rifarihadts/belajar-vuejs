<template>
  <div id="app">
    halooooo
     <div id="map" ref="map"></div>
  </div>
</template>



<script >
// import func from '../../vue-temp/vue-editor-bridge.js';
import { eventBus } from '../assets/event-bus.js'
export default {
  data: function () {
    return {
      map:null,
      geocoder: null,
      placesService: null,
    };
  },
  mounted: function() {
    if(window.google)
    {
      this.load()
    }
    else
    {
      var self = this;
      setTimeout(function(){
        self.load()
      },1000)
    }
  },
  methods: {
    load: function () {
      console.log(window.google)
        this.geocoder = new window.google.maps.Geocoder();
        console.log(this.geocoder)
        this.map = new window.google.maps.Map(this.$refs["map"],{
          center : {
            lat: 3.590000, lng: 98.678020
          },
          zoom: 15,
          gestureHandling: "greedy"
        });
        
        // this.setMarkers();

        this.placesService = new window.google.maps.places.PlacesService(this.map);

        var latlng = { lat: 3.5899278, lng: 98.6741724 }
        this.updateMarker(latlng)
        
        window.google.maps.event.addListener(this.map, "click", (event) => {
        this.lastLat = event.latLng.lat();
        this.lastLng = event.latLng.lng();
        
        this.updateMarker(event.latLng);
        console.log(this.lastLat,this.lastLng);
        this.geocoder.geocode({'location': event.latLng}, (results) => {
          if (results) {
            console.log(results)
            eventBus.$emit('mapAddress', results);
          }
        });
      });
    },
    setMarkers : function() {
      var bounds = new window.google.maps.LatLngBounds()
      var latlng = { lat: 3.5899278, lng: 98.6741724 }
      new window.google.maps.Marker({
        map : this.map,
        position: latlng,
        draggable:true
      })
      bounds.extend(latlng)
      // this.map.fitBounds(bounds)
    },
    updateMarker(latLng) {
      if (!this.marker) {
        this.marker = new window.google.maps.Marker({
          map: this.map,
          draggable:true
        });

        window.google.maps.event.addListener(this.marker, "dragend", (event) => {
        this.lastLat = event.latLng.lat();
        this.lastLng = event.latLng.lng();
        console.log(this.lastLat,this.lastLng)
        this.geocoder.geocode({'location': event.latLng}, (results) => {
          if (results) {
            console.log(results)
            eventBus.$emit('mapAddress', results);
          }
        });
      });
      
      }
      
      this.marker.setPosition(latLng);
    },
  }
};
</script>
<style scoped>
  #map {
    height: 600px;
    background: gray;
  }
</style>
