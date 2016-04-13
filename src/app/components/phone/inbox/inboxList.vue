<template>
    <div class="header"></div>
    <div class="content">
      <ul class="inbox-list">
        <li class="inbox-item" v-for="message in last(me.inbox)">
          <span>{{ message.from }}</span>
          <span>{{ message.content }}</span>
          <span>{{ diff(message.sent_at) }}</span>
        </li>
      </ul>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
  'use strict';

  import moment from 'moment';

  import store from '../../../store';
  import { last } from 'ramda';
  import { orderBy, uniqBy } from 'lodash';

  export default {
    data() {
      return {
        me: this.$select('me'),
      };
    },
    methods: {
      last(list) {
          const lastMessage = orderBy(list, 'sent_at');
          const sort = uniqBy(lastMessage.reverse(), 'from');
          return sort;
      },
      diff(date) {
          return moment(date).fromNow();
      },
    },
  }
</script>

<style lang="sass" scoped>
  $background-content: #fefefe;
  $background-header: #121212;
  $border-item: #ccc;
  $border-search: #a4a4a4;
  $content-height: 40rem;
  $message-height: 5rem;
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

  .header {
    @extend .offset;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }
  .inbox {
    &-item {
      align-items: center;
      border-bottom: 1px solid $border-item;
      display: flex;
      height: $message-height;
      justify-content: space-around;
      list-style-type: none;
      width: 100%;
    }
    &-list {
      @extend .collapse;
      display: flex;
      flex-direction: column;
    }
  }
</style>
