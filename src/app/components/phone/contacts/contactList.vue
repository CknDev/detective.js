<template>
  <div class="header"></div>

  <div class="content">
    <input type="text"
    name="contact-search" class="contact-search" placeholder="search" />
    <ul class="contact-list">
      <li v-for="contact in contacts" class="contact-item">
        <contact-vue v-model="contact" v-bind:contact="contact"></contact-vue>
      </li>
    </ul>
  </div>

  <div class="footer"></div>
</template>

<script>
  'use strict';

  import store from '../../../store'
  import contactVue from './contact/contactItem.vue';

  export default {
    data() {
      return {
        contacts: this.$select('contacts'),
      }
    },
    components: {
      'contact-vue': contactVue,
    },
    methods: {
    },
  }
</script>

<style lang="sass" scoped>
$background-content: #fefefe;
$background-header: #121212;
$border-item: #ccc;
$border-search: #a4a4a4;
$content-height: 40rem;
$header-height: 4rem;
$phone-size: 25rem;

.offset {
  background-color: $background-header;
  border: 2rem solid $background-header;
  height: $header-height;
  width: $phone-size;
}
.collapse {
  margin: 0;
  padding: 0;
}

.header {
  @extend .offset;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
}

.contact{
  &-item {
    border-bottom: 1px solid $border-item;
    list-style-type: none;
    width: 100%;
  }
  &-list {
    @extend .collapse;
    display: flex;
    flex-direction: column;
  }
  &-search {
    width: $phone-size;
    border: 0;
    border-bottom: 1px solid $border-search;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
}

.content {
  @extend .collpase;
  background-color: $background-content;
  border-left: 2rem solid $background-header;
  border-right: 2rem solid $background-header;
  height: $content-height;
  width: $phone-size;
}

.footer {
  @extend .offset;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
}
</style>
