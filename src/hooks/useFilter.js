import { useState } from 'react';

const useFilter = (todoData) => {
  const [filter, setFilter] = useState('all');

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

  const todoCount = todoData.filter((el) => !el.completed).length;

  const onFilterChange = (filterName) => {
    setFilter(() => filterName);
  };

  const visibleItems = filterItems(todoData, filter);

  return [filter, onFilterChange, todoCount, visibleItems];
};

export default useFilter;
