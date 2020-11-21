import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

const TaskList = ({ todos, onDeleted }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return <Task key={id} item={itemProps} onDeleted={() => onDeleted(id)} />;
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  onDeleted: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
};

export default TaskList;
