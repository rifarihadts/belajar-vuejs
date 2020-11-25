<template>
  <div id="app">
    halooooo
     <div id="map" ref="map"></div>
  </div>
</template>



<script >

export default {
  data: function () {
    return {
      map:null
    };
  },
  mounted: function() {
    this.load()
  },
  methods: {
    load: function () {
        this.map = new window.google.maps.Map(this.$refs["map"],{
          center : {
            lat: 3.590000, lng: 98.678020
          },
          zoom: 15
        });
        this.setMarkers()
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
    }
  }
};
</script>
<style scoped>
  #map {
    height: 600px;
    background: gray;
  }
</style>
