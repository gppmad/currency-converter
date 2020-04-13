import Vue from 'vue';
import Vuetify from 'vuetify/lib';

export default new Vuetify({
    theme: {
        themes: {
          light: {        
            primary: '#303F9F',
            secondary: '#2196f3',
            accent: '#00bcd4',
            error: '#f44336',
            warning: '#ffc107',
            info: '#607d8b',
            success: '#4caf50',
            background:'#303F9F'    
          },
        },
      },
  })

  Vue.use(Vuetify);