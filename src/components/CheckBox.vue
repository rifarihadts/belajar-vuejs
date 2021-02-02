<template>
  <div id="example">
      <input  type="checkbox"  v-model="pointChecked" @change="check($event)"> Use Point
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      pointChecked: false,
    };
  },
  methods: {
    check: function () {
        // console.log(e)
        if(this.pointChecked == false)
        {
            console.log('kosong')
        }
        else
        {
            console.log('ada');
            
        }
    },
  },
};
</script>

