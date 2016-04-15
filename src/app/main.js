import Vue from 'vue';

// import contacts from './components/phone/contacts/contactList.vue' ;
// import numericpad from './components/phone/numericpad/index.vue';

Vue.config.debug = true;

const App = new Vue({
  el: '[data-ui="app"]',
  components: {
    // contacts,
    inbox: require('./components/phone/inbox/inboxList.js'),
    // numericpad,
  },
});
module.exports = App;
