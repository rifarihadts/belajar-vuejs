<template>
<div class="content-wrapper">
    <content-loader v-if="!banks"
      :speed="1"
      :animate="true"
    ></content-loader>
      <div v-else class="row">
      <div v-for="bank in banks" v-bind:key="bank.code">
        <label >
          <input type="radio" name="product" class="card-input-element"  @click="selectedBank(bank)"/>
            <div class="panel panel-default card-input">
              <div class="panel-heading"> <img :src="bank.image" alt="Avatar" style="width:100%"></div>
            </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ContentLoader } from 'vue-content-loader';

export default {
  components: {
    ContentLoader
  },

  data() {
    return {
      banks: null,
      myData: null
    }
  },
  methods:{
      selectedBank: function (bank) {
        this.bankCode = bank.code
        localStorage.setItem("selectedBank", this.bankCode);
         var ts = localStorage.getItem("selectedBank");
        console.log(ts)
      },
    },
  mounted() {
    // Just pretend this is an AJAX call. Use your imagination.
    let url = "http://localhost:8000/api/checkout/list-va";
      axios
        .get(url)
        .then(res => {
            this.banks = res.data.data;
        })
  }
}
</script>
<style scoped>

body {
  background: #F0E5E1 ;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

label {
    width: 100%;
}

.card-input-element {
    display: none;
    border-radius: 25px;
}

.card-input {
    margin: 10px;
    padding: 10px;
}

.card-input:hover {
    cursor: pointer;
}

.card-input-element:checked + .card-input {
     box-shadow: 0 0 2px 2px #80ff00;
 }
  
</style>