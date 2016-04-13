<template>
  <ul class="pad-list">
    <li class="pad-item" v-for="numeric in numerics">
      {{ numeric }}
    </li>
  </ul>
</template>
<script>
  'use strict';
  import { range } from 'lodash';
  export default {
    data() {
      return {
        numerics: range(1, 10),
      };
    },
    created() {
      this.numerics.push(0);
    },
  }
</script>
