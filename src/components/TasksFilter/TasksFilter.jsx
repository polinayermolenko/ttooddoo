import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const TaskFilter = ({ filter, onFilterChange }) => {
  let buttons = useMemo(() => {
    return [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ];
  }, []);

  buttons = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
};

TaskFilter.defaultProps = {
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string.isRequired,
};

export default TaskFilter;
