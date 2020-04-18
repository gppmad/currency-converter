<template>
  <v-row>

    <!-- Alert -->
    <v-col cols="12">
      <v-row
        align="center"
        justify="center"
        class="custom-container"
      >        
        <v-col cols="12" md="8" sm="12">
          <Alert class="mb-0" :showAlert="this.showAlert" :alertMessage="this.alertMessage" :alertType="this.alertType"></Alert>     
        </v-col>
      </v-row>
    </v-col>

    <!-- Date & calendar -->
    <v-col cols="12">
      <v-row
        align="center"
        justify="center"
        class="custom-container"
      >        
        <v-card            
          class="ml-3 mr-3 pl-6 pr-6 pb-0 mb-0"            
          tile
          flat            
        >
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y                                                                  
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Date"
                prepend-icon="event"
                readonly
                v-on="on"
                solo
                flat
                outlined                  
                class="custom-date-input"
                error-messages=""                  
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
        </v-card>        
      </v-row>
    </v-col>
    
    <v-col cols="12">
      <v-row
        align="center"
        justify="center"
        class="custom-container"
      >
        <!-- FROM section -->
        <v-col cols="12" md="3" sm="12">
          <v-card            
            class="ml-3 mr-3 pl-6 pr-6 mt-0 pt-0 mb-0 pb-0"            
            tile
            flat          
          >
            <p class="font-weight-bold text-center">From</p>
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
                type="number"
                v-on:change="getConversionFrom()"
                value=""
                solo
                flat
                outlined                              
              ></v-text-field>
          </v-card>
        </v-col>
        
        <!-- Swap icon -->
        <v-col cols="12" md="1" sm="12">
          <v-card            
            class="ml-3 mr-3 pl-6 pr-6 mb-5" 
            flat
            tile
          >
          <!-- visible on md and greater -->
            <v-icon 
              class="d-none d-sm-none d-md-flex" 
              large color="primary"
              @click="switchFromTo()"
            >
              mdi-swap-horizontal-bold
            </v-icon>

            <!-- visible only on sm -->
            <v-icon 
              class="d-sm-flex d-md-none" 
              large color="primary"
              @click="switchFromTo()"
            >
              mdi-swap-vertical-bold
            </v-icon>
          </v-card>
        </v-col>
          
        <!-- TO section -->
        <v-col cols="12" md="3" sm="12">
          <v-card            
            class="ml-3 mr-3 pl-6 pr-6 mt-0 pt-0 mb-0 pb-0"
            flat
            tile
          >
            <p class="font-weight-bold text-center">To</p>
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
              type="number"
              solo
              flat
              outlined
              v-model="amountTo"
            ></v-text-field>
          </v-card>          
        </v-col>        
      
      </v-row>
    </v-col>
    
  </v-row>
  
</template>

<script>

import axios from 'axios';
import Alert from '../components/Alert.vue';

export default {
  name: 'Homepage',

  components: {
    Alert,
  },

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

      response:{},

      showAlert:false,
      alertMessage:"",
      alertType:"error"   
    }
  },

  mounted(){
      axios
        .get('http://localhost:8000/api/convert/prepare')
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
      this.disableAlert();
      if(this.amountFrom == '')
        this.amountTo = ''
      else
      {
        axios
          .post('http://localhost:8000/api/convert/retrieve',{          
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
          .catch(error => {
            this.enableAlert(error.response)
          })
        }
    },

    getConversionTo: function(){
      this.disableAlert();
      if(this.amountTo== '')
        this.amountFrom = ''
      else{
        axios
          .post('http://localhost:8000/api/convert/retrieve',{          
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
          .catch(error => {
            this.enableAlert(error.response)
          })
        }
    },

    switchFromTo: function(){
      var tmp = this.currencyFrom;
      this.currencyFrom = this.currencyTo;
      this.currencyTo = tmp;
      this.getConversionFrom()

    },

    enableAlert: function(response){
      this.showAlert = true,
      this.alertMessage = response.data.errorMessage,
      this.alertType = response.data.errorType
    },

    disableAlert: function(){
      this.showAlert = false;
    }
  }
    


}
</script>

<style scoped>
</style>
