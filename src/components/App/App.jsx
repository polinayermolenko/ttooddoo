import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Tea'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newArray = [...todoData, this.createTodoItem(text)];

      return {
        todoData: newArray,
      };
    });
  };

  editItem = (id, text) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, label: text, editing: !oldItem.editing };

      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  toggleItem = (arr, id, propName) => {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleItem(todoData, id, 'completed'),
      };
    });
  };

  onToggleEditing = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleItem(todoData, id, 'editing'),
      };
    });
  };

  createTodoItem(label) {
    return {
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      label,
      time: `created ${formatDistanceToNow(new Date(), { includeSeconds: true })}`,
      completed: false,
      editing: false,
    };
  }

  render() {
    const { todoData } = this.state;
    const countDone = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - countDone;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
            onEdit={this.editItem}
          />
          <Footer todoCount={todoCount} />
        </section>
      </section>
    );
  }
}
