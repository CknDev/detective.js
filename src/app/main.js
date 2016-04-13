import Vue from 'vue';

// import contacts from './components/phone/contacts/contactList.vue' ;
import inbox from './components/phone/inbox/inboxList.vue';
// import numericpad from './components/phone/numericpad/index.vue';

Vue.config.debug = true;

const App = new Vue({
  el: '[data-ui="app"]',
  components: {
    // contacts,
    inbox,
    // numericpad,
  },
});
module.exports = App;
