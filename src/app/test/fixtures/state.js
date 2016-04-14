import moment from 'moment';

export default {
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
        sent_at: moment().subtract(7, 'days').format(),
      },
      {
        content: 'hello',
        from: 'James',
        sent_at: moment().subtract(5, 'days').format(),
      },
      {
        content: 'john',
        from: 'John',
        sent_at: moment().subtract(2, 'hours').format(),
      },
      {
        content: 'james',
        from: 'James',
        sent_at: moment().subtract(3, 'hours').format(),
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
};
