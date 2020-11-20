import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../TasksFilter/TasksFilter';

const Footer = ({ todoCount }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} item(s) left</span>
      <TaskFilter />
      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  todoCount: '3',
};

Footer.propTypes = {
  todoCount: PropTypes.number,
};

export default Footer;
