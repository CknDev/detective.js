import moment from 'moment';
import { orderBy, uniqBy } from 'lodash';

import store from '../../../store'; // eslint-disable-line no-unused-vars

require('insert-css')(require('./inboxList.css'));

module.exports = {
  template: require('./inboxList.html'),
  replace: true,
  data() {
    return {
      me: this.$select('me'),
    };
  },
  methods: {
    /**
     * Get last message for each contactList
     * @param {Array} inbox
     * @return {Array} last message
     */
    last(list) {
      const lastMessage = orderBy(list, 'sent_at');
      const sort = uniqBy(lastMessage.reverse(), 'from');
      return sort;
    },

    /**
     * Format date
     * @param {String} date
     * @return {String} date formatted
     */
    diff(date) {
      return moment(date).fromNow();
    },
  },
};
