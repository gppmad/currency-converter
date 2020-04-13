<template>
  <div>
    <!-- toolbar -->
    <v-toolbar flat max-height="70" min-height="70" color="#303F9F">      
        <router-link :to="{ name: 'homepage'}" class="no-text-decoration">              
         <h2 class="white--text mt-2 ml-3 font-weight-light">Currency Converter</h2>
        </router-link>                  
    </v-toolbar>
  </div>
</template>

<script>

export default {
  name: 'Toolbar',

data: () => ({
      drawer: false,
      group: null,
      menuItems:[
      {
        label: 'Homepage',
        icon: 'home',
        routeName: 'homepage'
      }
    ]
  }),

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
