<template>
  <v-card flat>
    <v-container class="container custom-container">     
      <!-- Date -->
      <v-row>
        <v-col cols="2" offset="5">
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"                        
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Date"
                prepend-icon="event"
                readonly
                v-on="on"
                solo
                class="custom-date-input"
              ></v-text-field>
            </template>
            <v-date-picker 
              v-model="date" 
              @input="referenceDate = false" 
              max= getTodayDate()
              
            ></v-date-picker>
          </v-menu>
        </v-col>
        </v-row>
      
        <v-row>
          <v-col cols="3" offset="2">
            <p class="font-weight-bold">From</p>
            <!-- Currency From -->
            <v-select class="pt-0 mt-4"
              v-model="currencyFrom"
              :items="currenciesList"
              item-text="label"
              item-value="value"
              flat
              outlined         
              solo>              
            </v-select>
          
          <!-- Amount -->
            <v-text-field
              v-model="amountFrom"
              value=""
              solo
              flat
              outlined
            ></v-text-field>
          </v-col>

          <!-- icon -->
          <v-col cols="2" >
            <v-icon class="custom-swap-horizontal" large color="primary">mdi-swap-horizontal-bold</v-icon>
          </v-col>
      
      
          <v-col cols="3">
            <p class="font-weight-bold">To</p>
            <!-- Currency To -->
            <v-select class="pt-0 mt-4"
              v-model="currencyTo"
              :items="currenciesList"
              item-text="label"
              item-value="value"
              flat
              outlined    
              solo>          
            </v-select>
            
            <!-- Amount -->
            <v-text-field 
                readonly 
                solo
                flat
                outlined
                v-model="response.amount"
              ></v-text-field>
          </v-col>

      </v-row>
      

    <v-btn depressed large color="primary" class="white--text" @click="getConversion()">Convert</v-btn>
  
    </v-container>
  </v-card>
</template>


<script>

import axios from 'axios';

export default {
  name: 'Homepage',

  data () {   

    return{
      currencyFrom:"",
      amountFrom:"",
      currencyTo:"",
      date: new Date().toISOString().substr(0, 10),
      referenceDate: false,
      dateMenu: false,
      currenciesList: [
        {
            "label": "EUR - Euro",
            "value": "EUR"
        },
        {
            "label": "JPY - Japanese Yen",
            "value": "JPY"
        },
        {
            "label": "BGN - Bulgarian Lev",
            "value": "BGN"
        },
        {
            "label": "USD - United States Dollar",
            "value": "USD"
        },
        {
            "label": "CZK - Czech Koruna",
            "value": "CZK"
        },
        {
            "label": "DKK - Danish Krone",
            "value": "DKK"
        },
        {
            "label": "GBP - British Pound Sterling",
            "value": "GBP"
        },
        {
            "label": "HUF - Hungarian Forint",
            "value": "HUF"
        },
        {
            "label": "PLN - Polish Zloty",
            "value": "PLN"
        },
        {
            "label": "RON - Romanian Leu",
            "value": "RON"
        },
        {
            "label": "SEK - Swedish Krona",
            "value": "SEK"
        },
        {
            "label": "CHF - Swiss Franc",
            "value": "CHF"
        },
        {
            "label": "ISK - Icelandic Króna",
            "value": "ISK"
        },
        {
            "label": "NOK - Norwegian Krone",
            "value": "NOK"
        },
        {
            "label": "HRK - Croatian Kuna",
            "value": "HRK"
        },
        {
            "label": "RUB - Russian Ruble",
            "value": "RUB"
        },
        {
            "label": "TRY - Turkish Lira",
            "value": "TRY"
        },
        {
            "label": "AUD - Australian Dollar",
            "value": "AUD"
        },
        {
            "label": "BRL - Brazilian Real",
            "value": "BRL"
        },
        {
            "label": "CAD - Canadian Dollar",
            "value": "CAD"
        },
        {
            "label": "CNY - Chinese Yuan Renminbi",
            "value": "CNY"
        },
        {
            "label": "HKD - Hong Kong Dollar",
            "value": "HKD"
        },
        {
            "label": "IDR - Indonesian Rupiah",
            "value": "IDR"
        },
        {
            "label": "ILS - Israeli New Sheqel",
            "value": "ILS"
        },
        {
            "label": "INR - Indian Rupee",
            "value": "INR"
        },
        {
            "label": "KRW - South Korean Won",
            "value": "KRW"
        },
        {
            "label": "MXN - Mexican Peso",
            "value": "MXN"
        },
        {
            "label": "MYR - Malaysian Ringgit",
            "value": "MYR"
        },
        {
            "label": "NZD - New Zealand Dollar",
            "value": "NZD"
        },
        {
            "label": "PHP - Philippine Peso",
            "value": "PHP"
        },
        {
            "label": "SGD - Singapore Dollar",
            "value": "SGD"
        },
        {
            "label": "THB - Thai Baht",
            "value": "THB"
        },
        {
            "label": "ZAR - South African Rand",
            "value": "ZAR"
        }
      ],

      response:{}
   
    }
  },

  methods:{

    getConversion: function(){
      axios
        .post('http://192.168.8.101:8000/api/convert/retrieve',{          
            amount: this.amountFrom,
            src_currency: this.currencyFrom,
            dest_currency: this.currencyTo,
            reference_date: this.date
          
        })
        .then(response => {
          this.response = response.data
          console.log('Api converter')

        })
    },

    getTodayDate: function(){
      var date = new Date();
      
      var month = date.getMonth() > 8 ?  String(date.getMonth()+1) : "0" + String(date.getMonth()+1);
      var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

      return date.getFullYear() + "-" + month + "-" + day;
        
    }
  }
    


}
</script>

<style scoped>
  .custom-swap-horizontal{
    margin-top: 92px;
  }
</style>
