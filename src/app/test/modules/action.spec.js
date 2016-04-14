import test from 'ava';

import * as actions from '../../modules/action.js';

/** contacts */
test('addContact', t => {
  t.is(actions.ADD_CONTACT, 'ADD_CONTACT');
  t.deepEqual(actions.addContact({ name: 'john' }),
    { type: 'ADD_CONTACT', contact: { name: 'john' } });
});

test('updateContact', t => {
  t.is(actions.UPDATE_CONTACT, 'UPDATE_CONTACT');
  t.deepEqual(actions.updateContact(0, { id: 0, name: 'james' }),
    { type: 'UPDATE_CONTACT', id: 0, payload: { id: 0, name: 'james' } });
});

test('removeContact', t => {
  t.is(actions.REMOVE_CONTACT, 'REMOVE_CONTACT');
  t.deepEqual(actions.removeContact(0),
    { type: 'REMOVE_CONTACT', id: 0 });
});

test('callContact', t => {
  t.is(actions.CALL_CONTACT, 'CALL_CONTACT');
  t.deepEqual(
    actions.callContact({ id: 0, name: 'James' }, { id: 1, name: 'John' }),
    {
      type: 'CALL_CONTACT',
      caller: { id: 0, name: 'James' },
      receiver: { id: 1, name: 'John' },
    });
});

/** unread */
test('STATUS_UNREAD', t => {
  t.is(actions.STATUS_UNREAD, 'STATUS_UNREAD');
});

test('countUnread', t => {
  t.is(actions.COUNT_UNREAD, 'COUNT_UNREAD');
  t.deepEqual(actions.countUnread(0), { type: 'COUNT_UNREAD', id: 0 });
});
