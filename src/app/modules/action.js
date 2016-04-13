/**
 * @const ADD_CONTACT
 * @desc add a contact to the phone
 */
export const ADD_CONTACT = 'ADD_CONTACT';

/**
 * @const UPDATE_CONTACT
 * @desc update a contact
 */
export const UPDATE_CONTACT = 'UPDATE_CONTACT';

/**
 * @const REMOVE_CONTACT
 * @desc remove a contact from the phone
 */
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

/**
 * @const CALL_CONTACT
 * @desc call a contact
 */
export const CALL_CONTACT = 'CALL_CONTACT';

/**
 * @const SEND_MESSAGE
 * @desc send a sms
 */
export const SEND_MESSAGE = 'SEND_MESSAGE';

/**
 * @const STATUS_UNREAD
 * @desc set the unread status
 */
export const STATUS_UNREAD = 'STATUS_UNREAD';

/**
 * @const COUNT_UNREAD
 * @desc count inbox unread's message
 */
export const COUNT_UNREAD = 'COUNT_UNREAD';


/**
 * @method addContact
 * @param {Object} contact
 */
export function addContact(contact) {
  return { type: ADD_CONTACT, contact };
}

/**
 * @method updateContact
 * @param {Integer} id
 * @param {Object} payload
 */
export function updateContact(id, payload) {
  return { type: UPDATE_CONTACT, id, payload };
}

/**
 * @method removeContact
 * @param {Integer} id
 */
export function removeContact(id) {
  return { type: REMOVE_CONTACT, id };
}

/**
 * @method callContact
 * @param {Object} caller - from contact
 * @param {Object} receiver - to contact
 */
export function callContact(caller, receiver) {
  return { type: CALL_CONTACT, caller, receiver };
}

/**
 * @method sendMessage
 * @param {Object} sender - from contact
 * @param {Object} receiver - to contact
 * @param {Object} message
 */
export function sendMessage(sender, receiver, message) {
  return { type: SEND_MESSAGE, sender, receiver, message };
}

/**
 * @method countUnread
 * @param {Integer} id contact id
 */
export function countUnread(id) {
  return { type: COUNT_UNREAD, id };
}
