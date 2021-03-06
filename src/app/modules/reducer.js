import * as type from './action';

/**
  * @desc count unread messages for a given contact id
  * @method unread
  * @param {Integer} id - contact id to search for
  * @param {Array} contacts
  */
export function unread(id, contacts) {
  const currentContact = contacts.filter(contact => contact.id === id);
  return currentContact.unread;
}

/**
 * @desc update a contact prop
 * @method update
 * @param {Integer} id - contact id to update
 * @param {Object} prop - property to update
 * @param {Object} prop.name - property name
 * @param {Object} prop.value
 * @param {Array} contacts
 */
function update(id, payload, contacts) {
  return contacts.map(contact => {
    if (id === contact.id) {
      return Object.assign({},
        contact,
        { name: payload.name, phone_number: payload.phone_number }
      );
    }
    return contact;
  });
}

/**
 * @desc reduce contacts
 * @method contacts
 * @param {Object} state - original state
 * @param {Object} action
 * @param {String} action.type - type of action to apply to the state
 * @return {Object} state - updated state
 */
export default function (state, action) {
  if (!(action) || !(action.type)) {
    return state;
  }
  switch (action.type) {
    case type.ADD_CONTACT:
      return Object.assign({}, state, { contacts: [...state.contacts, action.contact] });
    case type.UPDATE_CONTACT:
      return Object.assign({}, state,
         { contacts: update(action.id, action.payload, state.contacts) });
    case type.REMOVE_CONTACT:
      return Object.assign({}, state,
         { contacts: state.contacts.filter(contact => contact.id !== action.id) });
    case type.COUNT_UNREAD:
      return Object.assign({}, state, { unread: unread(action.id, state.contacts) });
    default:
      return state;
  }
}
