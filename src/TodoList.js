import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class TodoList extends Component {
  createNew(e) {
    if (e.which === 13) {
      this.props.store.createTodo(e.target.value);
      e.target.value = '';
    }
  }

  filter(e) {
    this.props.store.filter = e.target.value;
  }

  toggleComplete(todo) {
    todo.complete = !todo.complete;
  }

  render() {
    const { clearComplete, filter, filteredTodos, completeTodos, todos } = this.props.store;

    const todoList = filteredTodos.map(todo => (
      <li key={todo.id}>
        <input type="checkbox"
               onChange={this.toggleComplete.bind(this, todo)}
               value={todo.complete}
               checked={todo.complete}
        /> {todo.value}
      </li>
    ));

    const completedCount = completeTodos.length;

    return (
      <div className="todo-list col-md-10 col-md-offset-1 col-lg-8 col-md-offset-2">
        <h1 className="center-full-width">React + MobX Todo List</h1>
          <div className="form-group">
            <label>Create new todo - hit Return key to add</label>
            <input className="form-control" onKeyPress={this.createNew.bind(this)} />
          </div>
          <div className="form-group">
            <label>Filter todos</label>
            <input className="form-control" value={filter} onChange={this.filter.bind(this)} />
          </div>
        <ul>{todoList}</ul>
        <div className="center-full-width">
          <button className="btn btn-primary"
                  disabled={!completedCount}
                  onClick={clearComplete}
          >Clear Completed Todos ({completeTodos.length})</button>
        </div>
      </div>
    );
  }
}
