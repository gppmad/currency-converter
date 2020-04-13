<template>
  <v-app>
    <Toolbar/>    
     <v-content align="center" class="custom-container">
      <v-container class="customer-container">
        <router-view></router-view>
        <v-spacer></v-spacer> 
      </v-container>
    </v-content>

  </v-app>
</template>

<script>

import Toolbar from './components/Toolbar';

export default {
  name: 'App',

  components: {
    Toolbar,
  },
  data: () => ({
    
  }),

};
</script>

<style scoped>

  .routerLink{
    text-decoration: none;
  }
</style>