import Vue from 'vue';

Vue.config.debug = true;

const App = new Vue({
  el: '[data-ui="wiki"]',
  data: {
    urls: [
      { name: 'modules', link: 'modules' },
    ],
  },
});
module.exports = App;
