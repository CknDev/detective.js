import Vue from 'vue';
import Revue from 'revue';
import { compose,
         createStore } from 'redux';
import persistState from 'redux-localstorage';
import moment from 'moment';

import reducer from './modules/reducer';
import * as actions from './modules/action';

const createPersistentStore = compose(persistState())(createStore);
const reduxStore = createPersistentStore(reducer, {
  me: {
    inbox: [
      {
        content: 'hello',
        from: 'James',
        sent_at: moment().format(),
      },
      {
        content: 'hio',
        from: 'John',
        sent_at: moment().add(7, 'days').format(),
      },
      {
        content: 'hello',
        from: 'James',
        sent_at: moment().add(5, 'days').format(),
      },
      {
        content: 'john',
        from: 'John',
        sent_at: moment().add(2, 'hours').format(),
      },
      {
        content: 'james',
        from: 'James',
        sent_at: moment().add(3, 'hours').format(),
      },
    ],
    outbox: [],
    name: 'Me',
    avatar: 'http://placekitten.com/50/50',
    phone_number: '+3301444444',
  },
  contacts: [{
    id: 0,
    name: 'John',
    avatar: 'http://placekitten.com/50/50',
    phone_number: '+3301526378',
    unread: 0,
  }, {
    id: 1,
    name: 'James',
    avatar: 'http://placekitten.com/50/50',
    phone_number: '+3300123154',
    unread: 1,
  }],
});
const store = new Revue(Vue, reduxStore, actions);

export default store;
