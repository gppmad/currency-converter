<template>
  <div class="container custom-container">
    <v-alert 
      class="text-center" 
      :value="showAlert"
      :type="alertType" 
      dismissible
    >
      {{alertMessage}}
    </v-alert>
  </div>
</template>

<script>

export default {
  name: 'Alert',

  props:{
      showAlert: Boolean,
      alertMessage: String,
      alertType: String,
  },

data: () => ({

  }),
}

</script>

<style scoped>

</style>
