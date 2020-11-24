import React, { Component } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Tea'),
      this.createTodoItem('Tidy my room'),
      this.createTodoItem('Have a lunch'),
    ],
    filter: 'all',
  };

  handleKeyDown = () => {
    const { todoData } = this.state;
    const editingItem = todoData.find((item) => item.editing === true);
    if (typeof editingItem === 'object') {
      this.onToggleEditing(editingItem.id);
    }
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id);

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
      const newArray = todoData.map((el) => {
        if (el.id === id) {
          return { ...el, label: text, editing: !el.editing };
        }
        return el;
      });

      return {
        todoData: newArray,
      };
    });
  };

  toggleItem = (arr, id, propName) => {
    return arr.map((el) => {
      if (el.id === id) {
        return { ...el, [propName]: !el[propName] };
      }
      return el;
    });
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

  filterItems = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onClear = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((item) => !item.completed);
      return {
        todoData: newArr,
      };
    });
  };

  createTodoItem(label) {
    return {
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      label,
      completed: false,
      editing: false,
      time: new Date(),
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const todoCount = todoData.filter((el) => !el.completed).length;
    const visibleItems = this.filterItems(todoData, filter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
            onEdit={this.editItem}
            onBlur={this.onToggleEditing}
            onKeyDown={this.handleKeyDown}
          />
          <Footer
            todoCount={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClear={this.onClear}
            todoData={todoData}
          />
        </section>
      </section>
    );
  }
}
