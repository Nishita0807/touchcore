// main.js
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

export const eventBus = new Vue(); // Central event bus for communication between components

new Vue({
  render: h => h(App),
}).$mount('#app');
