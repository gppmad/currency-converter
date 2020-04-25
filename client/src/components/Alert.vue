<template>
<v-card            
    class="ml-3 mr-3 pl-3 pr-3 mt-0 pt-0 mb-0 pb-0"            
    tile
    flat          
  >
  <v-alert
    class="text-center mb-0"
    :value="showAlert"
    :type="alertType"
    dismissible
    transition="slide-y-reverse-transition"
    duration="2000"
  >
    {{alertMessage}}
  </v-alert>
</v-card>
</template>

<script>
export default {
  name: "Alert",

  props:{
    showAlert: Boolean,
    alertMessage: String,
    alertType: String
  },

  data: () => ({})
};
</script>

<style scoped>

</style>
