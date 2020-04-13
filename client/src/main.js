import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/css/main.css'
import Routes from './router/router.js'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes
});


new Vue({
  el: '#app',
  router,
  
  vuetify,
  render: h => h(App)
});