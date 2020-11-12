<template>
    <div id="example">
        <input v-model='message' :maxlength="limit" @input='charCount()'>
        <p>{{ reversedMessage }}</p>
        <span>{{ totalcharacter }} characters</span>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            message: '',
            totalCharacter:0,
            limit:16
        }
  },
    methods: {
        charCount: function() {
            this.totalcharacter = this.message.length
        }
    },
  computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
}
</script>

