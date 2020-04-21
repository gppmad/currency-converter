<template>
  <v-row>    
    <!-- Alert -->
    <v-col cols="12">
      <v-row
        align="center"
        justify="center"
        class="custom-container"
      >        
        <v-col cols="12" md="9" sm="12" class="pt-0 pb-0">                    
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
                hide-details                                                     
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

        <!-- FROM secntion -->
        <v-col cols="12" md="4" sm="12">
          <v-card            
            class="ml-3 mr-3 pl-6 pr-6 mt-0 pt-0 mb-0 pb-0"            
            tile
            flat          
          >         

            <v-row>
              <!-- Flag From -->
              <v-col cols="3" class="pt-0">
                <v-avatar class="flag-style" 
                  :class="[{'mt-11': this.$vuetify.breakpoint.mdAndUp, 'mt-10': !this.$vuetify.breakpoint.mdAndUp }]">
                  
                  <v-img
                    :src="require('../assets/img/flags/' + getIdFlag(currencyFrom) + '.svg')"
                  />
                </v-avatar>
              </v-col>

              <v-col cols="9" class="pt-0">
                <p class="font-weight-bold text-center mb-0">From</p>               
                <v-select class="mt-4 mb-4"
                  v-model="currencyFrom"
                  v-on:change="getConversionFrom()"
                  :items="currenciesList"
                  item-text="label"
                  item-value="value"
                  flat
                  outlined  
                  :dense="!this.$vuetify.breakpoint.mdAndUp"
                  hide-details
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
                  :dense="!this.$vuetify.breakpoint.mdAndUp"
                  hide-details
                  outlined                              
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>


      <!-- Swap icon md-->
        <v-col cols="12" md="1" class="d-none d-sm-none d-md-flex">
          <v-card            
            class="ml-3 mr-3 pl-6 pr-6 mt-0 pt-0 mb-0 pb-0"
            flat
            tile
          >                     
            <v-row 
             align="center"
            justify="center"
            class="custom-container">                                    
              <v-col cols="12" class="pt-0">
                <v-card                               
                  flat
                  tile
                >
                  <v-icon 
                    
                    large color="primary"
                    @click="switchFromTo()"
                  >
                    mdi-swap-horizontal-bold
                  </v-icon>  
                </v-card>          
              </v-col>              
            </v-row>
          </v-card>          
        </v-col>

       
        <!-- Swap icon sm-->
        <v-col cols="12" sm="12" class="d-sm-flex d-md-none">
          <v-card            
            class="ml-3 mr-3 pl-6 pr-6 mt-0 pt-0 mb-0 pb-0"
            flat
            tile
          >                     
            <v-row>                                     
              <v-col cols="9" offset="3" class="pt-0">
                <v-card            
                  class="ml-3 mr-3 pl-6 pr-6 mb-5" 
                  flat
                  tile
                >
                  <v-icon 
                    class="d-sm-flex d-md-none" 
                    large color="primary"
                    @click="switchFromTo()"
                  >
                    mdi-swap-vertical-bold
                  </v-icon>  
                </v-card>          
              </v-col>              
            </v-row>
          </v-card>          
        </v-col>


        <!-- TO section -->
        <v-col cols="12" md="4" sm="12">
          <v-card            
            class="ml-3 mr-3 pl-6 pr-6 mt-0 pt-0 mb-0 pb-0"
            flat
            tile
          >

            <!-- Flag To -->
            <v-row>           
              <v-col cols="3" class="pt-0">
                <v-avatar class="flag-style"
                  :class="[{'mt-11': this.$vuetify.breakpoint.mdAndUp, 'mt-10': !this.$vuetify.breakpoint.mdAndUp }]">
                  <v-img
                    :src="require('../assets/img/flags/' + getIdFlag(currencyTo) + '.svg')"
                  />
                </v-avatar>
              </v-col>   
              
              <!-- Currency To -->              
              <v-col cols="9" class="pt-0">
                <p class="font-weight-bold text-center mb-0">To</p>
                <v-select class="pt-0 mt-4 mb-4"
                  v-model="currencyTo"
                  :items="currenciesList"
                  v-on:change="getConversionTo()"
                  item-text="label"
                  item-value="value"
                  flat                  
                  outlined 
                  :dense="!this.$vuetify.breakpoint.mdAndUp"
                  hide-details   
                  solo>          
                </v-select>
                
                <!-- Amount -->
                <v-text-field 
                  v-on:change="getConversionTo()"
                  type="number"
                  solo
                  flat
                  outlined
                  :dense="!this.$vuetify.breakpoint.mdAndUp"
                  hide-details
                  v-model="amountTo"
                ></v-text-field>                
              </v-col>
              
            </v-row>
          </v-card>          
        </v-col>        
      
      </v-row>
    </v-col>
    
  </v-row>
  
</template>

<script>

import axios from 'axios';
import Alert from '../components/Alert.vue';
import flagsList from "../assets/img/flags/flagsList.json"

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
      alertType:"error",

      flagsList: flagsList,
      currentFlagFrom:"../assets/img/flags/eu.svg",
      currentFlagTo:"../assets/img/flags/us.svg"
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
    },
    
    getIdFlag: function(id){
      var currentFlag="";

      this.flagsList.data.forEach(element =>{
        if(element.value == id)
          currentFlag= element.flagId;
      });

      return currentFlag;
    }
    
    


  }
    


}
</script>

<style scoped>
.flag-icon{
  font-size: 40px;
  border-radius: 50%;
}

.flag-style{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid lightgray;
}

</style>
