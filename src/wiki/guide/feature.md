---
label: features
id: features
categorySlug: guide
categoryLabel: guide
categoryRank: 3
documentRank: 2

# Add a new feature

Using Test Driven Development (TDD) approach,
with [ava][ava] as test library and [nyc][nyc] for coverage.

The creation of a [todo][todoMVC] list component will illustrate the approach.

## Setup

The todo feature will be an independant feature, and so forth will have his
own modules and components.

A static server and auto-compiler can be started through:
```bash
$ gulp # static server at http://localhost:3000
```

## Make a todo module

### add todo

First, make a todo directory inside the test directory, and make an action spec
file:

```bash
$ mkdir src/app/test/modules/todo
$ cd $_
$ touch action.spec.js
```
import [ava][ava] lib:

```javascript
/**
 *  @file src/app/modules/todo/action.spec.js
 */

import test as 'ava';
```

Finally, make the a todo directory in the app folder, with an action file:

```bash
$ mkdir src/app/modules/todo
$ cd $_
$ touch action.js
```

#### add todo action

To be able to create an add todo action, we need type and a function that return
the type and the payload todo.
Append to the file:

```javascript
/**
 *  @file src/app/modules/todo/action.spec.js
 */
[...]

import * as actions from '../../modules/todo/action';

test('add todo', t => {
  t.is(actions.ADD_TODO, 'ADD_TODO');
  t.deepEqual(
    actions.addTodo({ name: "wake up" }),
    { type: actions.ADD_TODO, todo: { name: "wake up" } }
  );
});
```

Run test and watch it fail:

```bash
$ npm run test
```

Implement it:
```javascript
/**
 * @file src/app/modules/todo/action.js
 */

/** @const {String} ADD_TODO */
export const ADD_TODO = 'ADD_TODO';


/**
 * Add a todo
 * @method addTodo
 * @param  {Object} todo
 */
export function addTodo(todo) {
  return { type: ADD_TODO, todo };
}
```

Run test and watch it pass:
```bash
$ npm run test
```

Don't forget to lint and generate doc for your code:

```bash
$ npm run cover # check for coverage
$ gulp lint # eslint
$ gulp doc # esdoc
$ gulp wiki # generate a static server
```

### add todo reducer

To add todo, we need a reducer that will add the todo:

```bash
# create test file
$ cd src/app/test/modules/todo
$ touch reducer.spec.js

# create reducer file
$ cd src/app/modules/todo
$ touch reducer.js
```

Create a test :

```javascript
/**
 * @file src/app/test/modules/todo/reducer.spec.js
 */
import test from 'ava';
import reducer from '../../modules/todo/reducer';

test('reducer default', t => {
    t.deepEqual(reducer({ todos: [] }), { todos: [] });
});

test('reducer: add todo', t => {
  t.deepEqual(
    reducer({ type: 'ADD_TODO', { name: "wake up" } }),
    { todos: [ { name: "wake up" } ] }
  );
});
```
Watch it fail:

```bash
$ npm run test
```
Implement it :

```javascript
/**
 * @file src/app/modules/todo/reducer.js
 */

import * as type from './action.js';

/**
 * Reduce state given an action type
 * @method function
 * @param  {Object} state  original state
 * @param  {Object} action
 * @return {Object} new state mutated
 */
export default function(state, action) {
  if (!(action) || !(action.type)) {
    return state;
  }
  switch (action.type) {
    case type.ADD_TODO :
      return Object.assign({ }, state, todos: [...state.todos, action.todo]);
    default:
      return state;
  }
}
```

Run test and watch it pass:
```bash
$ npm run test
```
Don't forget to lint and generate doc for your code:

```bash
$ npm run cover # check for coverage
$ gulp lint # eslint
$ gulp doc # esdoc
$ gulp wiki # generate a static server
```

### add todo store

Add reducer to the global store file:

```bash
$ cd src/app
$ ${EDITOR} store.js
```

```javascript
[...imports]
import { ...,
        combineReducer } from 'redux';

import todoReducer from './modules/todo/reducer';

const reducers = combineReducer(reducer, todoReducer);
const reduxStore = createPersistentStore(reducer, { [...] });
```

### add todo component

create todo component:

```bash
$ mkdir src/app/components/todos
$ cd $_

# create template, behavior, stylesheet list file
$ touch todoList.html todoList.js todoList.scss

# create template, behavior, stylesheet item file
$ mkdir todo
$ cd $_
$ touch todoItem.html todoItem.js todoItem.scss

# create template, behavior, stylesheet add file
$ touch todoAdd.html todoAdd.js todoAdd.scss
```

#### template files

```html
<!-- @file src/app/components/todos/todoList.html -->
<div class="content">
  <ul class="todo-list">
    <li class="todo-item" v-for="todo in todos">
      <todo-vue v-model="todo" v-bind:todo="todo"></todo-vue>
    </li>
  </ul>
  <div class="todo-action">
    <todo-add></todo-add>
  </div>
</div>
```

```html
<!-- @file src/app/components/todos/todo/todoItem.html -->
<div class="todo-content">
  <div class="todo-name">{{todo.name}}</div>
</div>
```

```html
<!-- @file src/app/components/todos/todo/todoAdd.html -->
<form class="todo-add--form">
  <input type="text" name="todo-add--input" placeholder="name" />
  <input type="submit" name="todo-add--submit" value="add todo" />
</form>
```

#### stylesheet files

stylesheets files are created with scss. It should be transpiled with:

```bash
$ gulp sass
```

Create stylesheet for each component:

```sass
// @file src/app/components/todos/todoList.scss
.todo {
  &-list {
    [ ... ]  
  }
  &-item {
    [ ... ]
  }
}
```

Scss file, once transpiled into css, will be imported from behaviour js file:

#### behavior files

```javascript
/**
 * @file src/app/components/todos/todoList.js
 */

import store from '../../../store'; // eslint-disable-line no-unused-vars
require('insert-css')(require('./todoList.css'));

export default {
  data() {
    return {
      todos: this.$select('todos')
    };
  },
}
```

```javascript
/**
 * @file src/app/components/todos/todo/todoItem.js
 */

import store from '../../../store'; // eslint-disable-line no-unused-vars
require('insert-css')(require('./todoItem.css'));

export default{
  props: ['todo'],
}
```

[ava]: https://github.com/sindresorhus/ava
[nyc]: https://github.com/bcoe/nyc
[todoMVC]: http://todomvc.com/

---
