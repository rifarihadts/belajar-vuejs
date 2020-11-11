<template>
    <div>
        <div class="alert alert-success" role="alert">
      <h2 class="alert-heading">Insert your credit card data</h2>
    </div>

    <div class="form-group">
      <label for="nomor_kartu">Nomor Kartu</label>
      <div class="input-group">
        <input
          type="number"
          id="nomor_kartu"
          name="nomor_kartu"
          placeholder="Nomor Kartu Kredit"
          class="form-control"
          :value="amount"
          @input="updateValue"
        />
        <div class="input-group-append"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-8">
        <div class="form-group">
          <label><span class="hidden-xs">Valid Date</span></label>
          <div class="input-group">
            <input
              type="number"
              placeholder="MM"
              name=""
              class="form-control"
              required
            />
            <input
              type="number"
              placeholder="YY"
              name=""
              class="form-control"
              required
            />
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group mb-4">
          <label
            data-toggle="tooltip"
            title="Three-digits code on the back of your card"
            >CVV
            <i class="fa fa-question-circle"></i>
          </label>
          <input type="text" required class="form-control" />
        </div>
      </div>
    </div>
            <button v-on:click="$emit('ganti-gambar')">Random gambar</button>
    </div>
</template>

<script>
export default {
    data() {
    return {
      amount: 7800
    }
  },
    methods: {
    updateValue(event) {
      const value = event.target.value
      console.log(value)
      console.log(value, this.amount)
      if (String(value).length <= 10) {
        this.amount = value
      }
      this.$forceUpdate()
    }
  }
}
</script>