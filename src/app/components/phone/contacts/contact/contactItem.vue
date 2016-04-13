<template>
  <div v-bind:class="['contact-container', editfolded?'show':'hide']">
    <div class="contact-head">
      <img :src="contact.avatar" class="contact-avatar" alt="avatar">
      <div class="contact-inbox" v-show="contact.unread !== 0">
        {{contact.unread}}
      </div>
    </div>

    <div class="contact-content">
      <div class="contact-name">{{contact.name}}</div>
      <div class="contact-phoneNumber"> {{ contact.phone_number }}</div>
    </div>

    <div class="contact-action">
      <button type="button" name="contact-send" v-model="contact.message"
      class="contact-message">msg</button>

      <button type="button" name="contact-edit" v-model="contact.id"
      class="contact-edit" @click="toggleEdit()">edit </button>

      <button type="button" name="contact-remove" v-model="contact.id"
      v-on:click="remove(contact.id)" class="contact-remove">remove </button>
    </div>
  </div>
  <contact-inbox
    v-bind:inbox="contact.inbox"></contact-inbox>
  <contact-edit
    v-bind:contact="editable()"
    v-bind:editfolded="editfolded"></contact-edit>
</template>

<script>
'use strict';
import { pick } from 'ramda';
import store from '../../../../store';
import contactEdit from './contactEdit.vue';
export default {
  props: ['contact'],
  data() {
    return {
      editfolded: true,
    };
  },
  components: {
    'contact-edit': contactEdit,
  },
  events: {
      'toggleEdit': function(folded) {
        this.editfolded = !folded;
      },
      'update': function({ id, name, phone_number }) {
        const { updateContact }  = store.actions;
        store.dispatch(updateContact(
          id,
          { name: name, phone_number: phone_number }));
      },
  },
  methods: {
    editable() {
      return pick(['id','name', 'phone_number'], this.contact);
    },
    toggleEdit() {
      this.editfolded = !this.editfolded;
    },
    remove(id) {
      const { removeContact } = store.actions;
      store.dispatch(removeContact(id));
    },
    countUnread(contact) {
      const { countUnread } = store.actions;
      store.dispatch(countUnread(contact.id));
    },
  },
}
</script>

<style lang="sass" scoped>
$border-search: #a4a4a4;
$contact-height: 5rem;
$content-width: 25rem;
$content-height: 40rem;


.hide {
    visibility: hidden;
    width: 0;
    height: 0;
    opacity: 0;
}
.show {
    visibility: visible;
    width: auto;
    opacity: 1;
    height: $contact-height;
}

.contact {
  &-action {
    margin-left: auto;
    margin-right: 1rem;
  }
  &-avatar {
    border-radius: 50%;
  }
  &-container {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-basis: 4rem;
  }
  &-content {
    width: 10rem;
    display: flex;
    justify-content: space-around;
  }
  &-head {
    display: flex;
    width: 50px;
    margin-left: .5rem;
  }
  &-inbox {
    align-items: center;
    border-radius: 50%;
    background-color: red;
    color: white;
    display: flex;
    height: 1.6rem;
    justify-content: center;
    margin-left: -21px;
    margin-top: -3px;
    opacity: .8;
    position: absolute;
    width: 1.6rem;
  }
  &-name {
    flex-basis: 15%;
    text-align: center;
  }
  &-search {
    width: $content-width;
    border: 0;
    border-bottom: 1px solid $border-search;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
}
</style>
