<template>
  <div v-bind:class="['contact-container--edit', editfolded?'form-folded':'form-unfolded']">
    <i class="contact-icon--back" @click="toggleEdit()">
      &#8606;
    </i>
    <form v-bind:class="['contact-form--edit']">
      <label for="name">name</label>
      <input type="text"
        name="form-edit--name" class="contact-edit--input"
        v-model="contact.name"/>

      <label for="phone">phone</label>
      <input type="text"
        name="form-edit--phone" class="contact-edit--input"
        v-model="contact.phone_number" />

      <input type="submit"
       name="form-edit--submit" class="contact-edit--submit"
       @click="edit($event)"
       value="submit"/>
    </form>
  </div>
</template>

<script>
  'use strict';

  export default {
    props: ['contact', 'editfolded'],
    methods: {
      toggleEdit() {
        this.$dispatch('toggleEdit', this.editfolded);
      },
      edit(e) {
        e.preventDefault();
        this.$dispatch('update', this.contact);
      },
    },
  }
</script>

<style lang="sass" scoped>
  $contact-height: 5rem;

  .form {
    &-folded {
      visibility: hidden;
      opacity: 0;
      width: 0;
      height: 0;
    }
    &-unfolded {
      visibility: visible;
      opacity: 1;
      width: auto;
      height: $contact-height;
    }
  }
  .contact {
    &-container {
      &--edit {
        display: flex;
        width: 100%;
      }
    }
    &-edit {
      &--input {
        width: 5rem;
      }
    }
    &-form {
      &--edit {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
