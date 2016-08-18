import { computed, observable } from 'mobx';

class Todo {
  @observable value;
  @observable id;
  @observable complete;

  constructor(value) {
    this.value = value;
    this.id = Date.now();
    this.complete = false;
  }
}

class TodoStore {
  @observable todos = [];
  @observable filter = '';
  @computed get filteredTodos() {
    const matchesFilter = new RegExp(this.filter, 'i');
    return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value));
  }
  @computed get completeTodos() {
    return this.todos.filter(todo => todo.complete);
  }

  createTodo(value) {
    this.todos.push(new Todo(value));
  }

  clearComplete = () => {
    const incompleteTodos = this.todos.filter(todo => !todo.complete);
    this.todos.replace(incompleteTodos);
  }
}

export default new TodoStore;
