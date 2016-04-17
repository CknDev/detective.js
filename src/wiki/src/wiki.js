import Vue from 'vue';

Vue.config.debug = true;

const App = new Vue({
  el: '[data-ui="wiki"]',
  data: {
    urls: [
      { name: 'modules', link: 'modules' },
      { name: 'components', link: 'components' },
      { name: 'guide', link: 'guide' },
      { name: 'tasks', link: 'tasks' },
    ],
    tools: [
      { cat: 'test', name: 'ava', link: 'https://github.com/sindresorhus/ava' },
      { cat: 'test', name: 'nyc', link: 'https://github.com/bcoe/nyc' },
      { cat: 'runner', name: 'gulp', link: 'http://gulpjs.com/' },
      { cat: 'compile', name: 'babel', link: 'http://babeljs.io/' },
      { cat: 'compile', name: 'browserify', link: 'http://browserify.org/' },
      { cat: 'libs', name: 'lodash', link: 'https://lodash.com/' },
      { cat: 'libs', name: 'ramda', link: 'http://ramdajs.com/' },
      { cat: 'libs', name: 'moment', link: 'http://momentjs.com/' },
      { cat: 'libs', name: 'redux', link: 'http://redux.js.org' },
      { cat: 'libs', name: 'redux-localstorage',
        link: 'https://github.com/elgerlambert/redux-localstorage' },
      { cat: 'libs', name: 'vue', link: 'http://vuejs.org' },
      { cat: 'libs', name: 'revue', link: 'https://github.com/revue/revue' },
    ],
  },
});
module.exports = App;
