import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../TasksFilter/TasksFilter';

const Footer = ({ todoCount, filter, onFilterChange, onClear }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} item(s) left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  onFilterChange: () => {},
  onClear: () => {},
  filter: 'all',
  todoCount: '3',
};

Footer.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onClear: PropTypes.func,
  todoCount: PropTypes.number,
};

export default Footer;
