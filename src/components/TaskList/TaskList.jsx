import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return <Task key={id} item={itemProps} />;
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TaskList;
