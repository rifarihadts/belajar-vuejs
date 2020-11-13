<template>
  <div>
    <div class="alert alert-success" role="alert">
      <h2 class="alert-heading">Insert your credit card data</h2>
    </div>

    <div class="form-group">
      <label for="nomor_kartu">Nomor Kartu</label>
      <div class="input-group" style="position: relative">
        <input
          id="nomor_kartu"
          name="nomor_kartu"
          v-model="nomor_kartu"
          placeholder="Nomor Kartu Kredit"
          class="form-control"
          :maxlength="16"
          @keypress="isNumber($event)"
          :class="{ 'error': !nomor_kartu_valid, 'success' : nomor_kartu_valid }"
        />
        <div class="success-icon" v-if="nomor_kartu_valid">
          <i class="fas fa-check-circle"></i>
        </div>
        <!-- <div class="input-group-append"></div> -->
      </div>
    </div>
    <div class="row">
      <div class="col-sm-8">
        <div class="form-group">
          <label><span class="hidden-xs">Valid Date</span></label>
          <div class="input-group">
            <span style="width:25%;position:relative;display:inline-block">
              <input
                @keypress="isNumber($event)"
                :maxlength="2"
                v-model="mm"
                placeholder="MM"
                name="mm"
                class="form-control"
                :class="{ 'error': !mm_valid, 'success' : mm_valid}"
                required
              />
              <div class="success-icon" v-if="mm_valid">
                <i class="fas fa-check-circle"></i>
              </div>
            </span>
            <span style="width:25%;position:relative;display:inline-block">
              <input
                @keypress="isNumber($event)"
                :maxlength="2"
                v-model="yy"
                placeholder="YY"
                name="yy"
                class="form-control"
                :class="{ 'error': !yy_valid, 'success' : yy_valid}"
                required
              />
              <div class="success-icon" v-if="yy_valid">
                <i class="fas fa-check-circle"></i>
              </div>
            </span>
          </div>
          
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group mb-4">
          <label
            data-toggle="tooltip"
            title="Three-digits code on the back of your card"
            >CVV <i class="fa fa-question-circle"></i
          ></label>
           <span style="position:relative;display:inline-block">
          <input
            v-model="cvv"
            @keypress="isNumber($event)"
            :maxlength="3"
            required
            class="form-control"
            :class="{ 'error': !cvv_valid, 'success' : cvv_valid}"
          />
           <div class="success-icon" v-if="cvv_valid">
              <i class="fas fa-check-circle"></i>
            </div>
           </span>
        </div>
      </div>
    </div>

    <div class="col-sm-12" v-if="success_valid">
      <p style="color: green; font-size: 10pt">{{ success_message }}</p>
      <p style="color: red; font-size: 10pt">{{ error_message }}</p>
    </div>
    <!-- <button v-on:click="$emit('ganti-gambar')">Random gambar</button> -->
  </div>
</template>

<script >
export default {
  data: function () {
    return {
      nomor_kartu: "",
      mm: "",
      yy: "",
      cvv: "",
      nomor_kartu_valid: false,
      mm_valid: false,
      yy_valid: false,
      cvv_valid: false,
      success_valid: false,
      success_message: "",
      error_message: "",
      xendit: window.Xendit,
      validMonth: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
    };
  },
  watch: {
    nomor_kartu() {
      if (this.nomor_kartu.length < 16) {
        this.nomor_kartu_valid = false;
        this.success_valid = false;
      } else {
        this.nomor_kartu_valid = true;
        this.checkValidation(
          this.nomor_kartu_valid,
          this.mm_valid,
          this.yy_valid,
          this.cvv_valid
        );
      }
    },
    mm() {
      if (this.validMonth.indexOf(this.mm) === -1) {
        this.mm_valid = false;
        this.success_valid = false;
      } else {
         this.mm_valid = true;
        this.checkValidation(
          this.nomor_kartu_valid,
          this.mm_valid,
          this.yy_valid,
          this.cvv_valid
        );
      }
    },
    yy() {
      if (this.yy.length != 2) {
         this.yy_valid = false;
        this.success_valid = false;
      } else {
        this.yy_valid = true;
        this.checkValidation(
          this.nomor_kartu_valid,
          this.mm_valid,
          this.yy_valid,
          this.cvv_valid
        );
      }
    },
    cvv() {
      if (this.cvv.length < 3) {
        this.cvv_valid = false;
        this.success_valid = false;
      } else {
        this.cvv_valid = true;
        this.checkValidation(
          this.nomor_kartu_valid,
          this.mm_valid,
          this.yy_valid,
          this.cvv_valid
        );
      }
    },
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    checkValidation: function (cc, mm, yy, cvv) {
      if (cc && mm & yy & cvv) {
        this.xendit.setPublishableKey(
          "xnd_public_development_wSNVjEsIZgpKzUuIZWlTwKsWl7aBKUp1rTXeuO55ekUUiDZhhGwHHy0V4dhJ"
        );
        var tokenData = {
          amount: "10000",
          card_number: this.nomor_kartu,
          card_exp_month: this.mm,
          card_exp_year: "20" + this.yy,
          card_cvn: this.cvv,
          is_multiple_use: false,
          should_authenticate: false,
        };
        this.xendit.card.createToken(tokenData, this.handleToken);
      }
    },
    handleToken: function (err, data) {
      if (err) {
        this.success_valid = true;
        this.error_message = err.message;
      } else {
        if (data.status === "VERIFIED") {
          this.success_valid = true;
          localStorage.setItem("tokenResponse", JSON.stringify(data));
          // var token = JSON.parse(localStorage.getItem("tokenResponse"));
          this.success_message = "Verifikasi Berhasil";
          this.error_message = "";
        } else if (data.status === "IN_REVIEW") {
          localStorage.setItem("tokenResponse", JSON.stringify(data));
          // token = JSON.parse(localStorage.getItem("tokenResponse"));
          this.success_message = "Verifikasi Berhasil";
          this.error_message = "";
        } else if (data.status === "FAILED") {
          console.log(data.id);
          alert(data.status);
        }
      }
    },
  },
};
</script>
<style scoped>
.error_message {
  color: red;
  font-size: 8pt;
}
.success-icon {
  position: absolute;
  right: 5px;
  top: 6px;
  color: green;
  display: inline-block;
}
.error:focus-within {
  border:1px solid red;
}
.success:focus-within {
  border:1px solid green
}
.error:focus {
  box-shadow:0 0 0 0.2rem rgb(253 34 34 / 25%);
}
.success:focus {
  box-shadow: 0 0 0 0.2rem rgb(57 253 34 / 25%);
}
</style>