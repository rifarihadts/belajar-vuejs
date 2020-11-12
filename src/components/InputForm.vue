<template>
  <div id="app" class="container col-md-12" >
    <div class="container" style="max-width: 500px; text-align: left"> 
      <credit-component/>
    </div>  
    
    <div> 
      <button v-on:click="gantigambar()">Random gambar</button>
    <article v-if="!selectedHero">
      <hero-component v-on:ganti-gambar="gantigambar" v-for="(item, index) of hero" :hero="item" :index="index" :key="item.id"/>
    </article>
    <article v-else>
      <hero-component :hero="selectedHero" :index="0" />
    </article>
    </div>

    <computed-component/>
  </div>
</template>

<script>
import Credit from '../components/Credit.vue'
import Hero from '../components/Hero.vue'
import Computed from '../components/Computed.vue'
export default {
  components : {
    'credit-component' : Credit,
    'hero-component' : Hero,
    'computed-component' : Computed
  },
  name: "app",
  data: function() {
    return {
      hero : [
        {
          id:1,
          nama:'bambansdsdg',
          type:'human',
          gambar:'anlene.jpg'
        },
        {
          id:2,
          nama:'Sudqdrimadsn',
          type:'watsdsch',
          gambar:'dancow.jpg'
        },
        {
          id:3,
          nama:'Suddsadrimadsn',
          type:'watcxcxch',
          gambar:'dancow.jpg'
        },
        {
          id:4,
          nama:'Sudrimadasdsasn',
          type:'watsdqch',
          gambar:'dancow.jpg'
        },
        {
          id:5,
          nama:'Sudrimadsn',
          type:'wawqdwqtch',
          gambar:'dancow.jpg'
        },
        {
          id:6,
          nama:'Sudrimcxzcadsn',
          type:'watdq12ch',
          gambar:'dancow.jpg'
        },
        {
          id:7,
          nama:'Sudsdasdscrimadsn',
          type:'wascatch',
          gambar:'dancow.jpg'
        },
        {
          id:8,
          nama:'Sudsadsad12321edwsrimadsn',
          type:'watsdsadch',
          gambar:'dancow.jpg'
        },
        {
          id:9,
          nama:'Sudricsacsamadsn',
          type:'watcsdq21h',
          gambar:'dancow.jpg'
        }
      ],
      selectedHero: ''
    }
  },
  methods : {
    gantigambar: function() {
      // this.hero.nama = 'aqua',
      // this.hero.type = 'minuman',
      // this.hero.gambar = 'dancow.jpg'
      this.selectedHero = this.randomGambar()
    },
    randomGambar() {
      return this.hero[Math.floor(Math.random() * this.hero.length)]
    }
  }
  
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