<template>
    <div>
        <div id="main">
            <ul>
            <li> 
                <img :src="gambar" width="200">
                <p>{{index+1}} - {{hero.nama}}</p>
                <p>{{hero.type}}</p>
            </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props:['hero', 'index'],
    computed: {
        gambar:function() {
        console.log(this.hero);
        console.log(this.hero.gambar)
        return require('../assets/gambar/' + this.hero.gambar)
        }
  }
}
</script>

<style scoped>
    p {
        color:blueviolet
    }
    li {
        list-style: none;
    }   
</style>