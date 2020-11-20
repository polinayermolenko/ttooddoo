import React, { Component } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Tea', 'created 17 seconds ago'),
      this.createTodoItem('Make Awesome App', 'created 5 minutes ago'),
      this.createTodoItem('Have a lunch', 'created 5 minutes ago'),
    ],
  };

  createTodoItem(label, time) {
    return {
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      label,
      time,
      completed: false,
    };
  }

  render() {
    const { todoData } = this.state;
    const countDone = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - countDone;

    return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList todos={todoData} />
          <Footer todoCount={todoCount} />
        </section>
      </section>
    );
  }
}
