<template>
  <div>
    <div class="alert alert-success" role="alert">
      <h2 class="alert-heading">Insert your credit card data</h2>
    </div>

    <div class="form-group">
      <label for="nomor_kartu">Nomor Kartu</label>
      <div class="input-group">
        <input
          id="nomor_kartu"
          name="nomor_kartu"
          v-model="nomor_kartu"
          placeholder="Nomor Kartu Kredit"
          class="form-control"
          :maxlength="16"
          @keypress="isNumber($event)"
        />
        <div class="input-group-append"></div>
      </div>
      <span class="error_message">{{ cc_message }}</span>
    </div>
    <div class="row">
      <div class="col-sm-8">
        <div class="form-group">
          <label><span class="hidden-xs">Valid Date</span></label>
          <div class="input-group">
            <input
              @keypress="isNumber($event)"
              :maxlength="2"
              v-model="mm"
              placeholder="MM"
              name=""
              class="form-control"
              required
            />
            <input
              @keypress="isNumber($event)"
              :maxlength="2"
              v-model="yy"
              placeholder="YY"
              name=""
              class="form-control"
              required
            />
            </div>
            <div>
              <span class="error_message">{{ mm_message }}</span>
              <span class="error_message" :style="mm_valid? '' : 'padding-left:80px'">{{ yy_message }}</span>
            </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group mb-4">
          <label data-toggle="tooltip" title="Three-digits code on the back of your card">CVV <i class="fa fa-question-circle"></i></label>
          <input
            v-model="cvv"
            @keypress="isNumber($event)"
            :maxlength="4"
            required
            class="form-control"
          />
        <span class="error_message">{{ cvv_message }}</span>
        </div>
      </div>
    </div>
    <div class="col-sm-12" v-if="success_valid">
      <p style="color:green;font-size:10pt;"> Credit card berhasil di verifikasi </p>
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
      cc_message:"",
      mm_message:"",
      yy_message:"",
      cvv_message:"",
      nomor_kartu_valid:false,
      mm_valid:false,
      yy_valid:false,
      cvv_valid:false,
      success_valid:false,
      xendit: window.Xendit,
      data: ""
    };
  },
  watch: {
    nomor_kartu() {
      // this.cc_message = this.nomor_kartu.length < 16 ? "Harus 16 digit" : "";
      if(this.nomor_kartu.length < 16)
      {
        this.cc_message = "Harus 16 digit"
        this.nomor_kartu_valid = false
        this.success_valid=false
      }
      else
      {
        this.cc_message = ""
        this.nomor_kartu_valid = true
        this.checkValidation(this.nomor_kartu_valid,this.mm_valid,this.yy_valid,this.cvv_valid)
      }
    },
    mm(){
      var validMonth = ["01","02","03","04","05","06","07","08","09","10","11","12"]
      // this.mm_message =  validMonth.indexOf(this.mm) === -1 ? "Bulan tidak valid" : "";
      if(validMonth.indexOf(this.mm) === -1)
      {
        this.mm_message = "Bulan tidak valid"
        this.mm_valid = false;
        this.success_valid=false
      }
      else
      {
        this.mm_message = ""
        this.mm_valid = true;
        this.checkValidation(this.nomor_kartu_valid,this.mm_valid,this.yy_valid,this.cvv_valid)
      }
    },
    yy(){
      if(this.yy.length != 2)
      {
        this.yy_message = "Tahun tidak valid"
        this.yy_valid = false
        this.success_valid=false
      }
      else
      {
        this.yy_message = ""
        this.yy_valid = true;
        this.checkValidation(this.nomor_kartu_valid,this.mm_valid,this.yy_valid,this.cvv_valid)
      }
    },
    cvv(){
      if(this.cvv.length < 3)
      {
        this.cvv_message = "CVV tidak valid"
        this.cvv_valid = false
        this.success_valid=false
      }
      else
      {
        this.cvv_message = ""
        this.cvv_valid = true;
        this.checkValidation(this.nomor_kartu_valid,this.mm_valid,this.yy_valid,this.cvv_valid)
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
        // return this.nomor_kartu.replace(/^(.{4})(.{4})(.{4})(.*)$/, "   ");
        return true;
      }
    },
    createXenditToken: function() {
        let apiKey = "xnd_public_development_wSNVjEsIZgpKzUuIZWlTwKsWl7aBKUp1rTXeuO55ekUUiDZhhGwHHy0V4dhJ";

        let url = "https://api.xendit.co/v2/credit_card_tokens";
        var headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(apiKey + ":"));
        headers.append("Content-Type", "application/json");

        var reqBody = JSON.stringify({
            "amount": "10000",        
            "card_cvn": "123",
            "card_data" : {
              "account_number": "4000000000000002",        
              "cvn" : "123",
              "exp_month": "12",        
              "exp_year": "2020",        
            },   
            "is_single_use": true,
            "should_authenticate": false
        });

        var requestOptions = {
          method: 'POST',
          headers: headers,
          body: reqBody,
          redirect: 'follow'
        };

        fetch(url, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

        // var headers = new Headers();
        // console.log(btoa(apiKey + ":"))
        // headers.append("Authorization", "Basic " + btoa(apiKey + ":"));
        // headers.append("Content-Type", "application/json");
        // console.log(headers);
        // var tokenData = 
        // {        
        //     "amount": "10000",        
        //     "card_number": "4000000000000002",        
        //     "card_exp_month": "12",        
        //     "card_exp_year": "2020",        
        //     "card_cvn": "123",
        //     "is_multiple_use": false,
        //     "should_authenticate": true
        // }
        // this.xendit.card.createToken(tokenData, function (err, datas) {
        //   if (err) {
        //       //Define error handling
        //   }
        //   console.log(datas)
        // });
    },
    checkValidation: function (cc,mm,yy,cvv) {
      
      if(cc && mm & yy & cvv)
      {
        this.success_valid = true;
        if(this.success_valid == true)
        {
          this.createXenditToken();
        }
      } 
    }
  },
};
</script>
<style scoped>
  .error_message {
    color:red;
    font-size:8pt
  }
</style>