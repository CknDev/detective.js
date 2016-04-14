import test from 'ava';
import moment from 'moment';
import R from 'ramda';

import state from '../fixtures/state';
import reduce from '../../modules/reducer';
import * as actions from '../../modules/action';

test('reduce: default state', t => {
  t.deepEqual(reduce(state), state);
});

test('reduce:ADD_CONTACT', t => {
  const newState = reduce(
    state,
    {
      type: actions.ADD_CONTACT,
      contact: {
        id: 2,
        name: 'Joe',
        sent_at: moment().format(),
        avatar: 'http://placekitten/50/50',
      },
    }
  );
  t.is(state.contacts.length + 1, newState.contacts.length);
});

test('reduce:UPDATE_CONTACT', t => {
  const contacts = R.lensPath(['contacts']);
  const name = R.lensProp('name');
  const indexContact = R.lensIndex(1);
  const contact = R.compose(contacts, indexContact);
  const nameContact = R.compose(contact, name);
  const newState = reduce(
    state,
    {
      type: actions.UPDATE_CONTACT,
      id: 1,
      payload: {
        name: 'Joe',
      },
    }
  );
  t.is(R.view(nameContact, newState), 'Joe');
});

test('reduce:REMOVE_CONTACT', t => {
  const rmState = reduce(
    state,
    {
      type: actions.REMOVE_CONTACT,
      id: 1,
    }
  );
  t.is(state.contacts.length - 1, rmState.contacts.length);
});

test('reduce:COUNT_UNREAD', t => {
  const contacts = R.lensPath(['contacts']);
  const unread = R.lensProp('unread');
  const indexContact = R.lensIndex(1);
  const contact = R.compose(contacts, indexContact);
  const unreadContact = R.compose(contact, unread);
  const unreadState = reduce(
    state,
    {
      type: actions.COUNT_UNREAD,
      id: 1,
    }
  );
  t.is(R.view(unreadContact, unreadState), 1);
});
