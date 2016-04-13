<template>
  <div class="inbox-container">
    <ul class="inbox-list">
      <li class="inbox-item" v-for="message in last(me.inbox)">
        {{ message.from }}
        {{ message.content }}
        {{ message.sent_at }}
      </li>
    </ul>
  </div>
</template>

<script>
  'use strict';
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
    },
  }
</script>
