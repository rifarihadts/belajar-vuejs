<template>
  <div id="app">
    <div class="container-map">
      <input id="pac-input" class="controls" type="text" placeholder="Search Box"  v-model="theLocation">
        <div id="map" ref="map"></div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'

export const eventBus = new Vue({
  methods: {}
});

export default {
  data: function () {
    return {
      map:null,
      geocoder: null,
      theLocation: '',
      curPlace: null,
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
        this.geocoder = new window.google.maps.Geocoder();
        this.map = new window.google.maps.Map(this.$refs["map"],{
          center : {
            lat: 3.590000, lng: 98.678020
          },
          zoom: 15,
          gestureHandling: "cooperative"
        });
        
        const input = document.getElementById('pac-input');
        const autocomplete = new window.google.maps.places.Autocomplete(input);

        window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.curPlace = autocomplete.getPlace();
        this.theLocation = this.curPlace.formatted_address;
        console.log(this.curPlace)
        if (typeof this.curPlace.formatted_address !== "undefined") {          
            //update the map
            this.updateFromTextAddress(this.curPlace);
          }
        });

        var latlng = { lat: 3.5896654, lng: 98.6738261 }
        this.updateMarker(latlng)

        window.google.maps.event.addListener(this.map, "click", (event) => {
        this.lastLat = event.latLng.lat();
        this.lastLng = event.latLng.lng();
        
        this.updateMarker(event.latLng);
        this.geocoder.geocode({'location': event.latLng}, (results, status) => {
          if (results) {
            this.updateAddressFromMap(results)
          }
          else 
          {
            console.log(status)
          }
        });
      });
    },
    
    updateFromTextAddress(payload) 
    {
      this.map.setCenter(payload.geometry.location);
      this.updateMarker(payload.geometry.location);
      this.lastLat = payload.geometry.location.lat();
      this.lastLng = payload.geometry.location.lng();
    },

    updateAddressFromMap(payload) {
      const firstAddress = payload[0].formatted_address;
      this.theLocation = firstAddress;
    },
    updateMarker(latLng) {
      if (!this.marker) {
        this.marker = new window.google.maps.Marker({
          map: this.map,
        });
      }

      this.marker.setPosition(latLng);
    },
  }
};
</script>

<style scoped>
#map {
  height: 100% !important;
  width: 100% !important;
}

.container-map {
  width: 100%;
  height: 600px;
}

#pac-input {
  position: absolute;
  margin-top:15px;
  left:27%;
  z-index: 1;
  background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  margin-left: 12px;
  width: 30%;
  text-overflow: ellipsis;
}

#pac-input:focus {
  border-color: #4d90fe;
}

.loading-spinner {
  width: 500px;
  height: 500px;
}
</style>
