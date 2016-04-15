import store from '../../../store';
import contactVue from './contact/contactItem.vue';
require('insert-css')(require('./contactList.css'));

module.exports = {
  data() {
    return {
      contacts: this.$select('contacts'),
    };
  },
  components: {
    'contact-vue': contactVue,
  },
};
