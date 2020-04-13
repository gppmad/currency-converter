<template>
  <v-card flat>
    <v-container class="container custom-container">     
      <!-- Date -->
      <v-row>
        <v-col cols="2" offset="5">
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="true"
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
              v-on:change="getConversionFrom()"
              @input="referenceDate = false" 
              :min= minDate
              :max= maxDate
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
              v-on:change="getConversionFrom()"
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
              v-on:change="getConversionFrom()"
              value=""
              solo
              flat
              outlined
            ></v-text-field>
          </v-col>

          <!-- icon -->
          <v-col cols="2" >
            <v-icon 
              class="custom-swap-horizontal" 
              large color="primary"
              @click="switchFromTo()"
              >mdi-swap-horizontal-bold</v-icon>
          </v-col>
      
      
          <v-col cols="3">
            <p class="font-weight-bold">To</p>
            <!-- Currency To -->
            <v-select class="pt-0 mt-4"
              v-model="currencyTo"
              :items="currenciesList"
              v-on:change="getConversionTo()"
              item-text="label"
              item-value="value"
              flat
              outlined    
              solo>          
            </v-select>
            
            <!-- Amount -->
            <v-text-field 
                v-on:change="getConversionTo()"
                solo
                flat
                outlined
                v-model="amountTo"
              ></v-text-field>
          </v-col>

      </v-row>
    
    </v-container>
  </v-card>
</template>


<script>

import axios from 'axios';

export default {
  name: 'Homepage',

  data () {   

    return{
      currencyFrom:"EUR",
      amountFrom:"1",
      currencyTo:"USD",
      amountTo:"",
      date: "",
      minDate:"",
      maxDate: "",
      referenceDate: false,
      dateMenu: false,
      currenciesList: [],

      response:{}
   
    }
  },

  mounted(){
      axios
        .get('http://192.168.8.101:8000/api/convert/prepare')
        .then(response => {
          this.minDate = response.data.firstAvailableDate,
          this.maxDate = response.data.lastAvailableDate,
          this.date = response.data.lastAvailableDate;
          this.currenciesList = response.data.currenciesList
          console.log('Api converter')

          return this.getConversionFrom()
      })
  },

  methods:{

    getConversionFrom: function(){
      if(this.amountFrom == '')
        this.amountTo = ''
      else
      {
        axios
          .post('http://192.168.8.101:8000/api/convert/retrieve',{          
              amount: this.amountFrom,
              src_currency: this.currencyFrom,
              dest_currency: this.currencyTo,
              reference_date: this.date
            
          })
          .then(response => {
            this.response = response.data
            this.amountTo = response.data.amount
            console.log('Api converter.retrieve')

          })
        }
    },

    getConversionTo: function(){
      if(this.amountTo== '')
        this.amountFrom = ''
      else{
        axios
          .post('http://192.168.8.101:8000/api/convert/retrieve',{          
              amount: this.amountTo,
              src_currency: this.currencyTo,
              dest_currency: this.currencyFrom,
              reference_date: this.date
            
          })
          .then(response => {
            this.response = response.data
            this.amountFrom = response.data.amount
            console.log('Api converter.retrieve')

          })
        }
    },

    switchFromTo: function(){
      var tmp = this.currencyFrom;
      this.currencyFrom = this.currencyTo;
      this.currencyTo = tmp;
      this.getConversionFrom()

    },
    
  }
    


}
</script>

<style scoped>
  .custom-swap-horizontal{
    margin-top: 92px;
  }
</style>
