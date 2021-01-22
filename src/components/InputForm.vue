<template>
  <div id="app" class="container col-md-12" >
      <div class="container" style="max-width: 500px; text-align: left"> 
        <credit-component/>
      </div>  
    <!-- <div class="container"> 
      <maps-component/>
    </div>   -->
    <!-- <div class="container" style="max-width: 500px; text-align: left"> 
      <va-component/>
    </div>   -->
    <!-- <div>  -->
      <!-- <button v-on:click="gantigambar()">Random gambar</button>
    <article v-if="!selectedHero">
      <hero-component v-on:ganti-gambar="gantigambar" v-for="(item, index) of hero" :hero="item" :index="index" :key="item.id"/>
    </article>
    <article v-else>
      <hero-component :hero="selectedHero" :index="0" />
    </article>
    </div>

    <computed-component/> -->
  </div>
</template>

<script>
import Credit from '../components/Credit.vue'
// import Maps from '../components/Maps.vue'
// import Hero from '../components/Hero.vue'
// import Computed from '../components/Computed.vue'
// import VirtualAccount from '../components/VirtualAccount.vue'
export default {
  components : {
    'credit-component' : Credit,
    // 'maps-component' : Maps,
    // 'hero-component' : Hero,
    // 'computed-component' : Computed,
    // 'va-component' : VirtualAccount
  },
  name: "app",
 
  
};

</script>

<style>
  article {
    padding-top:20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>