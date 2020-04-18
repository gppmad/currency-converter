<template>
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
