/* eslint-disable no-console */
/**
* Deploy todo example for feature guide
*/
import fs from 'fs';
import mkdir from 'mkdirp';
import path from 'path';

const action = {
  content: `/**
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
`,
  name: 'action.js',
  path: path.join(__dirname, '..', '..', '..', 'src', 'app', 'modules', 'todo'),
  test: {
    content: `/**
*  @file src/app/modules/todo/action.spec.js
*/
import test from 'ava';

import * as actions from '../../modules/todo/action';

test('add todo', t => {
  t.is(actions.ADD_TODO, 'ADD_TODO');
  t.deepEqual(
    actions.addTodo({ name: "wake up" }),
    { type: actions.ADD_TODO, todo: { name: "wake up" } }
  );
});
`,
    path: path.join(__dirname, '..', '..', '..', 'src', 'app', 'test', 'modules', 'todo'),
    name: 'action.spec.js',
  },
};

export function createTodoAction() {
  mkdir(action.path, (err) => {
    if (err) {
      console.error(err);
    }
    fs.writeFile(path.join(action.path, action.name), action.content, () => {
      console.log('written into %s', action.name);
    });
  });
  mkdir(action.test.path, (err) => {
    if (err) {
      console.error(err);
    }
    fs.writeFile(path.join(action.test.path, action.test.name), action.test.content, () => {
      console.log('written into %s', action.test.name);
    });
  });
}
createTodoAction();
