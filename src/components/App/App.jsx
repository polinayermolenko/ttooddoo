import React, { useState } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

const App = () => {
  let taskId = 100;

  const [filter, setFilter] = useState('all');

  const createTodoItem = (label, minutes, seconds) => {
    return {
      // eslint-disable-next-line no-plusplus
      id: taskId++,
      label,
      completed: false,
      editing: false,
      time: new Date(),
      minutesTimer: minutes,
      secondsTimer: seconds,
    };
  };

  const [todoData, setTodoData] = useState([
    createTodoItem('Drink Tea', '01', '30'),
    createTodoItem('Tidy my room', '01', '00'),
    createTodoItem('Have a lunch', '00', '30'),
  ]);

  const toggleItem = (arr, id, propName) => {
    return arr.map((el) => {
      if (el.id === id) {
        return { ...el, [propName]: !el[propName] };
      }
      return el;
    });
  };

  const onToggleEditing = (id) => {
    setTodoData((prevTodoData) => toggleItem(prevTodoData, id, 'editing'));
  };

  const onToggleCompleted = (id) => {
    setTodoData((prevTodoData) => toggleItem(prevTodoData, id, 'completed'));
  };

  const handleKeyDown = () => {
    const editingItem = todoData.find((item) => item.editing === true);
    if (typeof editingItem === 'object') {
      onToggleEditing(editingItem.id);
    }
  };

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.id !== id));
  };

  const addItem = (text, minutes, seconds) => {
    setTodoData((prevTodoData) => [...prevTodoData, createTodoItem(text, minutes, seconds)]);
  };

  const editItem = (id, text) => {
    setTodoData((prevTodoData) => {
      const newArray = prevTodoData.map((el) => {
        if (el.id === id) {
          return { ...el, label: text, editing: !el.editing };
        }
        return el;
      });
      return newArray;
    });
  };

  const filterItems = (items, filterName) => {
    switch (filterName) {
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

  const onFilterChange = (filterName) => {
    setFilter(() => filterName);
  };

  const onClear = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((item) => !item.completed));
  };

  const todoCount = todoData.filter((el) => !el.completed).length;
  const visibleItems = filterItems(todoData, filter);
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onToggleEditing={onToggleEditing}
          onEdit={editItem}
          onBlur={onToggleEditing}
          onKeyDown={handleKeyDown}
        />
        <Footer
          todoCount={todoCount}
          filter={filter}
          onFilterChange={onFilterChange}
          onClear={onClear}
          todoData={todoData}
        />
      </section>
    </section>
  );
};

export default App;
