import React from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import useFilter from '../../hooks/useFilter';
import useDeleteItem from '../../hooks/useDeleteItem';
import useEditingitem from '../../hooks/useEditingItem';
import useTodoData from '../../hooks/useTodoData';

const App = () => {
  const { todoData, setTodoData, addItem } = useTodoData();
  const { filter, onFilterChange, todoCount, visibleItems } = useFilter(todoData);
  const { deleteItem, onClear } = useDeleteItem(setTodoData);
  const { onToggleCompleted, onToggleEditing, handleKeyDown, editItem } = useEditingitem(setTodoData, todoData);

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
